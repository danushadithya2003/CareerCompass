import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from '../Services/skills.service';
import { WebService } from '../Services/web.service';
import { YoutubeService } from '../Services/youtube.service';
import { SkillDetail } from '../Models/skillDetail';
import { ForumService } from '../Services/forum.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../Models/question.model';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.css',
})
export class SkillDetailComponent {

  skillLoading:boolean = false
  questionLoading:boolean = false
  replyForm:FormGroup;
  questionForm:FormGroup;
  showOverlay:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private skillService: SkillsService,
    private youtubeService: YoutubeService,
    private router: Router,
    private forumService:ForumService,
    private formBuilder:FormBuilder
  ) {
    this.replyForm = this.formBuilder.group({
      replyInput:['',Validators.required]
    })
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  skill: SkillDetail;
  questions:Question[] = []

  youTubeVideoInfo: any[] = [];
  ngOnInit() {
    this.skillLoading = true
    const skillId = this.route.snapshot.paramMap.get('skillId');
    this.skillService.getSkill(skillId).subscribe((data) => {
      this.skill = data.data;
      console.log(this.skill);
      this.skillLoading = false
    });
    this.getQuestions(skillId)

  }

  getInfo(videoUrl: string) {
    const regex = /[?&]v=([^&]+)/;
    const match = videoUrl.match(regex);
    const videoId = match ? match[1] : null;
    return videoId
  }

  getQuestions(skillId:string){
    this.questionLoading = true
    this.forumService.getQuestions(skillId).subscribe((data)=>{
      const rawdata:any = data.data
      console.log("raw", rawdata);
      rawdata.forEach((question) => {
        // Transform the createdAt and updatedAt fields
        question.createdAt = this.formatDate(question.createdAt);
        question.updatedAt = this.formatDate(question.updatedAt);
        question.showReplies = false
        question.reply = false
        // Iterate through each answer of the question
        if (question.answers && question.answers.length > 0) {
          question.answers.forEach((answer) => {
            // Transform the createdAt field of each answer
            answer.createdAt = this.formatDate(answer.createdAt);
            answer.updatedAt = this.formatDate(answer.updatedAt);
          });
        }
      });
      // Assign the transformed data to the questions variable
      this.questions = data.data;
      this.questionLoading = false
      console.log(this.questions);
    })
  }

  getVideosInfo(skill) {
    skill.youtube.forEach((videoUrl) => {
      const videoId = this.getInfo(videoUrl)
      this.youtubeService.getInfo(videoId).subscribe((data) => {
        const videoInfo = {
          videoUrl: videoUrl,
          title: data.title,
          thumbnailUrl: data.thumbnailUrl,
          viewCount:data.viewCount,
          likeCount:data.likeCount
        };
        this.youTubeVideoInfo.push(videoInfo);
        console.log(this.youTubeVideoInfo);
      });
    });
  }

  navigateToRole(roleId: number) {
    this.router.navigate(['/role',roleId]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
  
    return `${day} ${month} ${year}, ${formattedHour}:${formattedMinute} ${period}`;
  }

  toggleReplies(question:any) {
    question.showReplies = !question.showReplies
    console.log(question.showReplies);
  }

  onReplySubmit(questionId:string,question:any) {
    if (this.replyForm.valid) {
      const replyValue = this.replyForm.value.replyInput;
      this.forumService.addAnswer(questionId,replyValue).subscribe((data)=>{
        this.replyForm.reset();
        const skillId = this.route.snapshot.paramMap.get('skillId');
        this.getQuestions(skillId);
        question.showReplies = true
      })
    }
  }

  onQuestionSubmit() {
    if (this.questionForm.valid) {
      const skillID = this.skill.skillID
      const title = this.questionForm.value.title
      const content = this.questionForm.value.content
      this.forumService.addQuestion(skillID,title,content).subscribe((data)=>{
        console.log(data);
        const skillId = this.route.snapshot.paramMap.get('skillId');
        this.getQuestions(skillId);
        this.questionForm.reset();
        this.showOverlay = false
      })
      
    }
  }
  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}
