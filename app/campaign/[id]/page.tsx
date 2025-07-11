"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, Calendar, Download, ArrowLeft, Share2,Bookmark, MessageSquare, ChevronRight,Send } from "lucide-react";
import PhotoUpload from "@/components/photo-upload";
import BannerPreview from "@/components/banner-preview";
import Header from "@/components/header";
import Footer from "@/components/footer";



const campaignData = {
  id: 1,
  title: "Cracking the Code 1.0",
  description: "University Life Career Launch & Beyond",
  category: "Education",
  creator: {
    name: "Tech University",
    avatar: "/university-logo.png",
    verified: true,
  },
  viewCount: 1250,
  downloadCount: 890,
  createdAt: "2024-01-15",
  templateUrl: "/campaign-template.png",
  placeholderConfig: {
    photoArea: { x: 450, y: 150, width: 120, height: 120, shape: "circle" },
    textArea: { x: 200, y: 300, width: 200, height: 40 },
  },
  tags: ["Education", "Career", "University", "Workshop"],
  isTrending: true
};

const comments = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/avatar1.jpg",
      role: "Software Engineer"
    },
    content: "Just created my banner for this campaign! The template was so easy to use.",
    date: "2 hours ago",
    likes: 24
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/avatar2.jpg",
      role: "Data Analyst"
    },
    content: "This campaign helped me create a professional profile picture for LinkedIn. Highly recommend!",
    date: "1 day ago",
    likes: 15
  }
];

export default function CampaignDetailPage() {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const handlePhotoUpload = (photoUrl: string) => {
    setUserPhoto(photoUrl);
  };

  const handleGenerateBanner = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Generation logic here
    setIsGenerating(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Comment submission logic
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Retained Hero Section */}
      <Header />
      
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/recents">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <Badge variant="secondary" className="bg-white/20 text-white mb-4">
                {campaignData.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{campaignData.title}</h1>
              <p className="text-xl text-blue-100 max-w-3xl">{campaignData.description}</p>
            </div>
            
            <div className="flex space-x-3">
              
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
               <Bookmark className="h-5 w-5 mr-2" />
             Save
                </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Hybrid Design */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Info (ALX style) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={campaignData.creator.avatar} />
                    <AvatarFallback>{campaignData.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{campaignData.creator.name}</p>
                    <p className="text-sm text-gray-500">Campaign Creator</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{campaignData.viewCount.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Download className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{campaignData.downloadCount} downloads</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{new Date(campaignData.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaignData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Section (ALX style) */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Community Activity</h3>
                <div className="space-y-4">
                  {comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{comment.user.name}</p>
                        <p className="text-sm text-gray-600">{comment.content}</p>
                        <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                          <span>{comment.date}</span>
                          <button className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-blue-600">
                  View all comments ({comments.length})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Banner Creation (Original functionality with ALX styling) */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-6">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("create")}
                    className={`pb-4 px-1 mr-6 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                  >
                    Create Your Banner
                  </button>
                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`pb-4 px-1 font-medium text-sm ${activeTab === "comments" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                  >
                    Comments ({comments.length})
                  </button>
                </div>

                {activeTab === "create" ? (
                  <div className="space-y-6">
                    {/* Banner Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <BannerPreview
                        templateUrl={campaignData.templateUrl}
                        userPhoto={userPhoto}
                        userName={userName}
                        placeholderConfig={campaignData.placeholderConfig}
                      />
                    </div>

                    {/* Photo Upload (ALX style) */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Upload Your Photo</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <PhotoUpload onPhotoUpload={handlePhotoUpload} />
                        <p className="text-sm text-gray-500 mt-2">
                          JPG, PNG or GIF. Max size 5MB
                        </p>
                      </div>
                    </div>

                    {/* Name Input (ALX style) */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Your Name</h3>
                      <Input
                        placeholder="Enter your name as you want it displayed"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerateBanner}
                      disabled={isGenerating || !userName.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Download Banner
                        </>
                      )}
                    </Button>

                    {/* Privacy Checkbox (ALX style) */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="public"
                        checked={isPublic}
                        onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                      />
                      <label htmlFor="public" className="text-sm text-gray-600">
                        Display my creation publicly on this campaign
                      </label>
                    </div>
                  </div>
                ) : (
                  /* Comments Tab (ALX style) */
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{comment.user.name}</h4>
                              <p className="text-sm text-gray-500">{comment.user.role}</p>
                            </div>
                            <span className="text-sm text-gray-400">{comment.date}</span>
                          </div>
                          <p className="mt-2 text-gray-700">{comment.content}</p>
                          <div className="mt-3 flex items-center space-x-4">
                            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {comment.likes}
                            </button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Comment Form (ALX style) */}
                    <form onSubmit={handleSubmitComment} className="mt-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/user-avatar.jpg" />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Add your comment..."
                            className="min-h-[100px]"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <div className="mt-2 flex justify-end">
                            <Button type="submit" size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tutorial Section (ALX style) */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">How to use your banner</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
                      title: "Social Media",
                      description: "Share on your profiles to promote the campaign"
                    },
                    {
                      icon: <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>,
                      title: "Email Signature",
                      description: "Add to your professional communications"
                    },
                    {
                      icon: <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>,
                      title: "Printed Materials",
                      description: "Use on flyers or event posters"
                    }
                  ].map((tip, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          {tip.icon}
                        </div>
                        <h4 className="font-medium">{tip.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// /*version 3 of the single campaign page*/

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ArrowLeft, Share2, MessageSquare, Bookmark, ChevronRight, Send } from "lucide-react";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// const campaignData = {
//   id: 1,
//   title: "ALX Career Readiness Program",
//   category: "Professional Development",
//   description: "Level up your career readiness with ALX's intensive training program",
//   longDescription: `
//     <p>This comprehensive program includes:</p>
//     <ul class="list-disc pl-5 space-y-2 mt-2">
//       <li>Technical skills certification</li>
//       <li>Career coaching sessions</li>
//       <li>Networking with industry leaders</li>
//       <li>Portfolio development</li>
//       <li>Job placement assistance</li>
//     </ul>
//   `,
//   stats: {
//     participants: 3743,
//     completionRate: "92%",
//     hiredWithin: "3 months"
//   },
//   testimonials: [
//     {
//       name: "Sarah Johnson",
//       role: "Software Engineer",
//       avatar: "/avatar1.jpg",
//       content: "I just leveled up my career readiness with ALX. The program gave me the skills and confidence to land my dream job at a top tech company!",
//       program: "AWS Cloud Practitioner",
//       date: "2 days ago"
//     },
//     {
//       name: "Michael Chen",
//       role: "Data Analyst",
//       avatar: "/avatar2.jpg",
//       content: "The ALX program transformed my career trajectory. I'm now working as a Data Analyst at a Fortune 500 company.",
//       program: "Data Science Specialization",
//       date: "1 week ago"
//     }
//   ]
// };

// export default function CampaignDetailPage() {
//   const [comment, setComment] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [activeTab, setActiveTab] = useState("about");

//   const handleSubmitComment = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle comment submission
//     setComment("");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />
      
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center mb-6">
//               <Link href="/programs">
//                 <Button variant="ghost" className="text-white hover:bg-white/10">
//                   <ArrowLeft className="h-5 w-5 mr-2" />
//                   Back to Programs
//                 </Button>
//               </Link>
//             </div>
            
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
//               <div>
//                 <Badge variant="secondary" className="bg-white/20 text-white mb-4">
//                   {campaignData.category}
//                 </Badge>
//                 <h1 className="text-4xl font-bold mb-4">#{campaignData.title}</h1>
//                 <p className="text-xl text-blue-100 max-w-3xl">{campaignData.description}</p>
//               </div>
              
//               <div className="flex space-x-3">
//                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   <Bookmark className="h-5 w-5 mr-2" />
//                   Save
//                 </Button>
//                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   <Share2 className="h-5 w-5 mr-2" />
//                   Share
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Left Column - Program Info */}
//             <div className="lg:w-1/3 space-y-6">
//               {/* Program Stats */}
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold text-lg mb-4">Program Impact</h3>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center pb-4 border-b border-gray-100">
//                       <span className="text-gray-600">Participants</span>
//                       <span className="font-medium">{campaignData.stats.participants.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between items-center pb-4 border-b border-gray-100">
//                       <span className="text-gray-600">Completion Rate</span>
//                       <span className="font-medium">{campaignData.stats.completionRate}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Hired Within</span>
//                       <span className="font-medium">{campaignData.stats.hiredWithin}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Join Program CTA */}
//               <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold text-lg mb-4">Ready to Level Up?</h3>
//                   <p className="text-gray-600 mb-6">Join thousands of professionals who transformed their careers with this program.</p>
//                   <Button className="w-full bg-blue-600 hover:bg-blue-700">
//                     Apply Now
//                   </Button>
//                   <div className="mt-4 flex items-center">
//                     <Checkbox 
//                       id="subscribe" 
//                       checked={isSubscribed} 
//                       onCheckedChange={() => setIsSubscribed(!isSubscribed)} 
//                     />
//                     <label htmlFor="subscribe" className="ml-2 text-sm text-gray-600">
//                       Get program updates
//                     </label>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right Column - Main Content */}
//             <div className="lg:w-2/3 space-y-6">
//               {/* Tab Navigation */}
//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8">
//                   <button
//                     onClick={() => setActiveTab("about")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "about" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
//                   >
//                     About Program
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("testimonials")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "testimonials" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
//                   >
//                     Success Stories ({campaignData.testimonials.length})
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("community")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "community" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
//                   >
//                     Community
//                   </button>
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               {activeTab === "about" && (
//                 <Card className="border-0 shadow-sm">
//                   <CardContent className="p-6">
//                     <div 
//                       className="prose max-w-none" 
//                       dangerouslySetInnerHTML={{ __html: campaignData.longDescription }} 
//                     />
                    
//                     <div className="mt-8">
//                       <h3 className="text-xl font-semibold mb-4">Program Timeline</h3>
//                       <div className="space-y-4">
//                         {[
//                           { week: "1-2", title: "Orientation & Foundations", description: "Build core skills and program expectations" },
//                           { week: "3-6", title: "Technical Training", description: "Deep dive into your specialization" },
//                           { week: "7-8", title: "Career Preparation", description: "Resume, portfolio, and interview training" },
//                           { week: "9-12", title: "Capstone Project", description: "Real-world application of your skills" }
//                         ].map((item, index) => (
//                           <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
//                             <div className="w-20 flex-shrink-0">
//                               <Badge variant="outline" className="bg-blue-50 text-blue-600">
//                                 Week {item.week}
//                               </Badge>
//                             </div>
//                             <div>
//                               <h4 className="font-medium text-gray-900">{item.title}</h4>
//                               <p className="text-sm text-gray-600 mt-1">{item.description}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeTab === "testimonials" && (
//                 <div className="space-y-6">
//                   {campaignData.testimonials.map((testimonial, index) => (
//                     <Card key={index} className="border-0 shadow-sm">
//                       <CardContent className="p-6">
//                         <div className="flex items-start space-x-4">
//                           <Avatar className="h-12 w-12">
//                             <AvatarImage src={testimonial.avatar} />
//                             <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
//                           </Avatar>
//                           <div className="flex-1">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
//                                 <p className="text-sm text-gray-500">{testimonial.role}</p>
//                               </div>
//                               <span className="text-sm text-gray-400">{testimonial.date}</span>
//                             </div>
//                             <p className="mt-3 text-gray-700">{testimonial.content}</p>
//                             <div className="mt-3">
//                               <Badge variant="outline" className="bg-green-50 text-green-600">
//                                 {testimonial.program}
//                               </Badge>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
                  
//                   <Card className="border-0 shadow-sm">
//                     <CardContent className="p-6">
//                       <h3 className="font-semibold text-lg mb-4">Share Your Success</h3>
//                       <form onSubmit={handleSubmitComment}>
//                         <Textarea
//                           placeholder="I just leveled up my career readiness with ALX..."
//                           className="min-h-[120px] mb-4"
//                           value={comment}
//                           onChange={(e) => setComment(e.target.value)}
//                         />
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-500">
//                             {comment.length}/500 characters
//                           </span>
//                           <Button type="submit" size="sm">
//                             <Send className="h-4 w-4 mr-2" />
//                             Post
//                           </Button>
//                         </div>
//                       </form>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}

//               {activeTab === "community" && (
//                 <Card className="border-0 shadow-sm">
//                   <CardContent className="p-6">
//                     <h3 className="font-semibold text-lg mb-6">Community Engagement</h3>
                    
//                     <div className="space-y-6">
//                       <div className="flex items-start space-x-4">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage src="/user1.jpg" />
//                           <AvatarFallback>JD</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="bg-gray-50 p-4 rounded-lg">
//                             <h4 className="font-medium text-gray-900">John Doe</h4>
//                             <p className="mt-1 text-gray-700">Just created my AWS Certified Cloud Practitioner certification through the ALX program. As a software engineer, I look forward to contributing to innovative projects.</p>
//                             <div className="mt-2 flex items-center text-sm text-gray-500">
//                               <span>2 hours ago</span>
//                               <button className="ml-4 flex items-center text-blue-600 hover:text-blue-800">
//                                 <MessageSquare className="h-4 w-4 mr-1" />
//                                 Reply
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-start space-x-4">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage src="/user2.jpg" />
//                           <AvatarFallback>AS</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="bg-gray-50 p-4 rounded-lg">
//                             <h4 className="font-medium text-gray-900">Alice Smith</h4>
//                             <p className="mt-1 text-gray-700">Completed the Data Science Specialization and now working as a Data Analyst at a leading tech company. The ALX program was instrumental in my career transition!</p>
//                             <div className="mt-2 flex items-center text-sm text-gray-500">
//                               <span>1 day ago</span>
//                               <button className="ml-4 flex items-center text-blue-600 hover:text-blue-800">
//                                 <MessageSquare className="h-4 w-4 mr-1" />
//                                 Reply
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <form onSubmit={handleSubmitComment} className="mt-6">
//                         <div className="flex items-start space-x-4">
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src={user.avatar} />
//                             <AvatarFallback>YO</AvatarFallback>
//                           </Avatar>
//                           <div className="flex-1">
//                             <Textarea
//                               placeholder="Add to the conversation..."
//                               className="min-h-[100px]"
//                               value={comment}
//                               onChange={(e) => setComment(e.target.value)}
//                             />
//                             <div className="mt-2 flex justify-end">
//                               <Button type="submit" size="sm">
//                                 Post Comment
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }



// /*version 2 of the single campaign page*/

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { Eye, Calendar, Facebook, Twitter, Linkedin, Download, ArrowLeft, Menu, X, Share2, Heart, MessageSquare, Bookmark } from "lucide-react";
// import PhotoUpload from "@/components/photo-upload";
// import BannerPreview from "@/components/banner-preview";
// import CommentsSection from "@/components/comments-section";
// import UserDropdown from "@/components/user-dropdown";
// import Header from "@/components/header";
// import Footer from "@/components/footer";
// import Link from "next/link"; 

// // Mock campaign data
// const campaignData = {
//   id: 1,
//   title: "Cracking the Code 1.0",
//   description: "University Life Career Launch & Beyond - Join us for an intensive workshop designed to help students transition from university life to successful careers.",
//   longDescription: `
//     <p>This comprehensive program covers:</p>
//     <ul class="list-disc pl-5 space-y-2 mt-2">
//       <li>Resume building and interview skills</li>
//       <li>Networking strategies with industry leaders</li>
//       <li>Personal branding and online presence</li>
//       <li>Industry insights from top professionals</li>
//       <li>Career path planning and mentorship</li>
//     </ul>
//     <p class="mt-4">The workshop includes hands-on activities, mock interviews, and networking sessions with recruiters from leading companies.</p>
//   `,
//   category: "Education",
//   creator: {
//     name: "Tech University Career Center",
//     avatar: "/university-logo.png",
//     verified: true,
//     bio: "Helping students launch successful careers since 2010"
//   },
//   viewCount: 1250,
//   downloadCount: 890,
//   likeCount: 342,
//   createdAt: "2024-01-15",
//   eventDate: "2024-03-20",
//   location: "Tech University Campus, Building A",
//   templateUrl: "/campaign-template.png",
//   placeholderConfig: {
//     photoArea: { x: 450, y: 150, width: 120, height: 120, shape: "circle" },
//     textArea: { x: 200, y: 300, width: 200, height: 40 },
//   },
//   tags: ["Education", "Career", "University", "Workshop", "Networking"],
//   isTrending: true,
//   isBookmarked: false,
//   isLiked: false
// }

// const trendingCampaigns = [
//   {
//     id: 2,
//     title: "Summer Music Festival 2024",
//     thumbnail: "/music-festival.jpg",
//     viewCount: 890,
//     category: "Music",
//     date: "2024-06-15"
//   },
//   {
//     id: 3,
//     title: "Tech Innovation Summit",
//     thumbnail: "/tech-summit.jpg",
//     viewCount: 2100,
//     category: "Technology",
//     date: "2024-04-10"
//   },
//   {
//     id: 4,
//     title: "Business Leaders Forum",
//     thumbnail: "/business-forum.jpg",
//     viewCount: 650,
//     category: "Business",
//     date: "2024-05-22"
//   },
//   {
//     id: 5,
//     title: "Contemporary Art Exhibition",
//     thumbnail: "/art-exhibition.jpg",
//     viewCount: 420,
//     category: "Art",
//     date: "2024-03-05"
//   }
// ]

// export default function CampaignDetailPage() {
//   const [userName, setUserName] = useState("");
//   const [userPhoto, setUserPhoto] = useState<string | null>(null);
//   const [isPublic, setIsPublic] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [campaign, setCampaign] = useState(campaignData);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({
//     name: "John Doe",
//     avatar: "/user-avatar.jpg",
//     role: "user",
//   });
//   const [activeTab, setActiveTab] = useState("details");

//   const handleAuthSuccess = (userData: any) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//     setIsAuthModalOpen(false);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser({ name: "", avatar: "", role: "user" });
//   };

//   const handlePhotoUpload = (photoUrl: string) => {
//     setUserPhoto(photoUrl);
//   };

//   const handleGenerateBanner = async () => {
//     if (!userName.trim()) {
//       alert("Please enter your name");
//       return;
//     }

//     setIsGenerating(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       const generatedBannerUrl = `/generated/banner-${Date.now()}.png`;
      
//       // Simulate download
//       const link = document.createElement("a");
//       link.href = generatedBannerUrl;
//       link.download = `${campaign.title.toLowerCase().replace(/\s+/g, "-")}-${userName.toLowerCase().replace(/\s+/g, "-")}.png`;
//       link.click();

//       // Update download count
//       setCampaign(prev => ({
//         ...prev,
//         downloadCount: prev.downloadCount + 1
//       }));
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleShare = (platform: string) => {
//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${campaign.title}"`)}&url=${encodeURIComponent(window.location.href)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
//     };
    
//     window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
//   };

//   const toggleLike = () => {
//     setCampaign(prev => ({
//       ...prev,
//       isLiked: !prev.isLiked,
//       likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1
//     }));
//   };

//   const toggleBookmark = () => {
//     setCampaign(prev => ({
//       ...prev,
//       isBookmarked: !prev.isBookmarked
//     }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header 
//         isLoggedIn={isLoggedIn}
//         user={user}
//         onLogin={() => {
//           setAuthMode("login");
//           setIsAuthModalOpen(true);
//         }}
//         onLogout={handleLogout}
//         onRegister={() => {
//           setAuthMode("register");
//           setIsAuthModalOpen(true);
//         }}
//       />

//       <main className="flex-grow">
//         {/* Back and Share Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//             <Button variant="ghost" className="text-white hover:bg-white/10">
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back to campaigns
//             </Button>
//             <div className="flex items-center space-x-2">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-white hover:bg-white/10"
//                 onClick={toggleBookmark}
//               >
//                 <Bookmark className={`h-5 w-5 mr-1 ${campaign.isBookmarked ? "fill-current" : ""}`} />
//                 {campaign.isBookmarked ? "Saved" : "Save"}
//               </Button>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-white hover:bg-white/10"
//                 onClick={() => handleShare("facebook")}
//               >
//                 <Share2 className="h-5 w-5 mr-1" />
//                 Share
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Campaign Info */}
//             <div className="lg:col-span-1 space-y-6">
//               <Card className="overflow-hidden">
//                 <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-100">
//                   <img 
//                     src={campaign.templateUrl} 
//                     alt={campaign.title}
//                     className="w-full h-full object-contain p-4"
//                   />
//                   <div className="absolute bottom-4 right-4">
//                     <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
//                       <Eye className="h-4 w-4 mr-1" />
//                       {campaign.viewCount.toLocaleString()} views
//                     </Badge>
//                   </div>
//                 </div>
//                 <CardContent className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <div className="flex items-center gap-2 mb-2">
//                         <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                           {campaign.category}
//                         </Badge>
//                         {campaign.isTrending && (
//                           <Badge variant="secondary" className="bg-red-100 text-red-800">
//                             Trending
//                           </Badge>
//                         )}
//                       </div>
//                       <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
//                     </div>
//                     <Button 
//                       variant={campaign.isLiked ? "default" : "outline"} 
//                       size="sm"
//                       onClick={toggleLike}
//                     >
//                       <Heart className={`h-4 w-4 mr-1 ${campaign.isLiked ? "fill-current" : ""}`} />
//                       {campaign.likeCount}
//                     </Button>
//                   </div>

//                   <div className="flex items-center space-x-3 mb-6">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={campaign.creator.avatar} />
//                       <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium text-gray-900 flex items-center">
//                         {campaign.creator.name}
//                         {campaign.creator.verified && (
//                           <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                           </svg>
//                         )}
//                       </p>
//                       <p className="text-sm text-gray-500">{campaign.creator.bio}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4 mb-6">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Calendar className="h-4 w-4 mr-2 text-gray-500" />
//                       <span>{new Date(campaign.eventDate).toLocaleDateString('en-US', { 
//                         weekday: 'long', 
//                         year: 'numeric', 
//                         month: 'long', 
//                         day: 'numeric' 
//                       })}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                       </svg>
//                       <span>{campaign.location}</span>
//                     </div>
//                   </div>

//                   <Separator className="my-4" />

//                   <div className="flex space-x-2">
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       onClick={() => handleShare("facebook")}
//                       className="flex-1"
//                     >
//                       <Facebook className="h-4 w-4 mr-2" />
//                       Share
//                     </Button>
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       onClick={() => handleShare("twitter")}
//                       className="flex-1"
//                     >
//                       <Twitter className="h-4 w-4 mr-2" />
//                       Tweet
//                     </Button>
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       onClick={() => handleShare("linkedin")}
//                       className="flex-1"
//                     >
//                       <Linkedin className="h-4 w-4 mr-2" />
//                       Post
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Stats Card */}
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold text-gray-900 mb-4">Campaign Stats</h3>
//                   <div className="grid grid-cols-3 gap-4 text-center">
//                     <div>
//                       <p className="text-2xl font-bold text-blue-600">{campaign.viewCount.toLocaleString()}</p>
//                       <p className="text-sm text-gray-500">Views</p>
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-green-600">{campaign.downloadCount}</p>
//                       <p className="text-sm text-gray-500">Downloads</p>
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-red-600">{campaign.likeCount}</p>
//                       <p className="text-sm text-gray-500">Likes</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Tags Card */}
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {campaign.tags.map((tag) => (
//                       <Link 
//                         key={tag} 
//                         href={`/categories/${tag.toLowerCase()}`}
//                         className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
//                       >
//                         {tag}
//                       </Link>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right Column - Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Tab Navigation */}
//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8">
//                   <button
//                     onClick={() => setActiveTab("details")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "details" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
//                   >
//                     Event Details
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("banner")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "banner" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
//                   >
//                     Create Banner
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("comments")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "comments" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
//                   >
//                     Comments ({campaign.comments?.length || 0})
//                   </button>
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               {activeTab === "details" && (
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: campaign.longDescription }} />
                    
//                     <div className="mt-8">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Schedule</h3>
//                       <div className="space-y-4">
//                         {[
//                           { time: "9:00 AM", title: "Registration & Breakfast", speaker: "" },
//                           { time: "10:00 AM", title: "Keynote: Career Trends 2024", speaker: "Jane Smith, Google" },
//                           { time: "11:30 AM", title: "Resume Workshop", speaker: "Career Center Team" },
//                           { time: "1:00 PM", title: "Lunch & Networking", speaker: "" },
//                           { time: "2:30 PM", title: "Mock Interviews", speaker: "Industry Professionals" },
//                           { time: "4:00 PM", title: "Closing Remarks", speaker: "University Dean" }
//                         ].map((item, index) => (
//                           <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
//                             <div className="w-24 flex-shrink-0">
//                               <p className="text-sm font-medium text-gray-900">{item.time}</p>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900">{item.title}</p>
//                               {item.speaker && (
//                                 <p className="text-sm text-gray-500 mt-1">{item.speaker}</p>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {activeTab === "banner" && (
//                 <>
//                   <Card>
//                     <CardContent className="p-6">
//                       <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Personalized Banner</h2>
                      
//                       <div className="mb-8">
//                         <BannerPreview
//                           templateUrl={campaign.templateUrl}
//                           userPhoto={userPhoto}
//                           userName={userName}
//                           placeholderConfig={campaign.placeholderConfig}
//                         />
//                       </div>

//                       <div className="space-y-6">
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-3">Upload Your Photo</h3>
//                           <PhotoUpload onPhotoUpload={handlePhotoUpload} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-3">Your Name</h3>
//                           <Input
//                             placeholder="Enter your name"
//                             value={userName}
//                             onChange={(e) => setUserName(e.target.value)}
//                             className="text-lg h-12"
//                           />
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <Checkbox
//                             id="public"
//                             checked={isPublic}
//                             onCheckedChange={(checked) => setIsPublic(checked as boolean)}
//                           />
//                           <label htmlFor="public" className="text-sm text-gray-600">
//                             Display my name and campaign publicly
//                           </label>
//                         </div>

//                         <Button
//                           onClick={handleGenerateBanner}
//                           disabled={isGenerating || !userName.trim()}
//                           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold shadow-lg"
//                           size="lg"
//                         >
//                           {isGenerating ? (
//                             <>
//                               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                               Generating your banner...
//                             </>
//                           ) : (
//                             <>
//                               <Download className="h-5 w-5 mr-2" />
//                               Download My Banner
//                             </>
//                           )}
//                         </Button>

//                         <p className="text-xs text-gray-500 text-center">
//                           By generating a banner, you agree to our{' '}
//                           <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardContent className="p-6">
//                       <h3 className="font-semibold text-gray-900 mb-3">How to use your banner</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {[
//                           {
//                             icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
//                             title: "Social Media",
//                             description: "Share on your profiles to spread the word"
//                           },
//                           {
//                             icon: <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                               <path fill="#fff" d="M8 11h8v2H8z"/>
//                             </svg>,
//                             title: "Email Signature",
//                             description: "Add to your emails as a signature"
//                           },
//                           {
//                             icon: <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
//                             </svg>,
//                             title: "Printed Materials",
//                             description: "Use on flyers or posters"
//                           }
//                         ].map((tip, index) => (
//                           <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-center mb-2">
//                               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                 {tip.icon}
//                               </div>
//                               <h4 className="font-medium text-gray-900">{tip.title}</h4>
//                             </div>
//                             <p className="text-sm text-gray-600">{tip.description}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </>
//               )}

//               {activeTab === "comments" && (
//                 <CommentsSection campaignId={campaign.id} />
//               )}
//             </div>
//           </div>

//           {/* Similar Campaigns */}
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Campaigns</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {trendingCampaigns.map((campaign) => (
//                 <Card key={campaign.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
//                   <div className="aspect-video relative overflow-hidden">
//                     <img
//                       src={campaign.thumbnail}
//                       alt={campaign.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <Badge className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800">
//                       {campaign.category}
//                     </Badge>
//                   </div>
//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
//                       {campaign.title}
//                     </h3>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <Calendar className="h-3 w-3 mr-1" />
//                         {new Date(campaign.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                       </div>
//                       <div className="flex items-center">
//                         <Eye className="h-3 w-3 mr-1" />
//                         {campaign.viewCount.toLocaleString()}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// /*version 1 of the single campaign page*/
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Separator } from "@/components/ui/separator"
// import { Eye, Calendar, Facebook, Twitter, Linkedin, Download, ArrowLeft, Menu, X } from "lucide-react"
// import PhotoUpload from "@/components/photo-upload"
// import BannerPreview from "@/components/banner-preview"
// import CommentsSection from "@/components/comments-section"
// import UserDropdown from "@/components/user-dropdown";

// // Mock campaign data - replace with real API call
// const campaignData = {
//   id: 1,
//   title: "Cracking the Code 1.0",
//   description:
//     "University Life Career Launch & Beyond - Join us for an intensive workshop designed to help students transition from university life to successful careers. This comprehensive program covers resume building, interview skills, networking strategies, and industry insights from leading professionals.",
//   category: "Education",
//   creator: {
//     name: "Tech University",
//     avatar: "/placeholder.svg?height=40&width=40",
//     verified: true,
//   },
//   viewCount: 1250,
//   downloadCount: 890,
//   createdAt: "2024-01-15",
//   templateUrl: "/placeholder.svg?height=400&width=600",
//   placeholderConfig: {
//     photoArea: { x: 450, y: 150, width: 120, height: 120, shape: "circle" },
//     textArea: { x: 200, y: 300, width: 200, height: 40 },
//   },
//   tags: ["Education", "Career", "University", "Workshop"],
//   isTrending: true,
// }

// const trendingCampaigns = [
//   {
//     id: 2,
//     title: "Summer Music Festival",
//     thumbnail: "/placeholder.svg?height=150&width=200",
//     viewCount: 890,
//     category: "Music",
//   },
//   {
//     id: 3,
//     title: "Tech Conference 2024",
//     thumbnail: "/placeholder.svg?height=150&width=200",
//     viewCount: 2100,
//     category: "Technology",
//   },
//   {
//     id: 4,
//     title: "Business Networking",
//     thumbnail: "/placeholder.svg?height=150&width=200",
//     viewCount: 650,
//     category: "Business",
//   },
//   {
//     id: 5,
//     title: "Art Exhibition",
//     thumbnail: "/placeholder.svg?height=150&width=200",
//     viewCount: 420,
//     category: "Art",
//   },
// ]

// export default function CampaignDetailPage() {
//   const [userName, setUserName] = useState("")
//   const [userPhoto, setUserPhoto] = useState<string | null>(null)
//   const [isPublic, setIsPublic] = useState(false)
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [newComment, setNewComment] = useState("")
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({
//       name: "John Doe",
//       avatar: "/placeholder.svg?height=32&width=32",
//       role: "user",
//     });

// const handleAuthSuccess = (userData: any) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//     setIsAuthModalOpen(false);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser({ name: "", avatar: "", role: "user" });
//   };

  
//   const handlePhotoUpload = (photoUrl: string) => {
//     setUserPhoto(photoUrl)
//   }

//   const handleGenerateBanner = async () => {
//     if (!userName.trim()) {
//       alert("Please enter your name")
//       return
//     }

//     setIsGenerating(true)

//     // Simulate banner generation
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 3000))

//       // In real implementation, this would call the backend API
//       const generatedBannerUrl = `/generated/banner-${Date.now()}.png`

//       // Trigger download
//       const link = document.createElement("a")
//       link.href = generatedBannerUrl
//       link.download = `${campaignData.title.toLowerCase().replace(/\s+/g, "-")}-${userName.toLowerCase().replace(/\s+/g, "-")}.png`
//       link.click()

//       alert("Banner generated successfully!")
//     } catch (error) {
//       alert("Failed to generate banner. Please try again.")
//     } finally {
//       setIsGenerating(false)
//     }
//   }

//   const handleShare = (platform: string) => {
//     const url = window.location.href
//     const text = `Check out this amazing campaign: ${campaignData.title}`

//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//     }

//     if (shareUrls[platform as keyof typeof shareUrls]) {
//       window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
//     }
//   }
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-gray-900">Alika</h1>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-8">
//                <a
//                 href="#create"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Create
//               </a>
//               <a
//                 href="#discover"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Recent Campaigns/Events
//               </a>
//               <a
//                 href="#categories"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Categories
//               </a>
             
//               <a
//                 href="/#"
//                 className="text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Help
//               </a>
//             </nav>

//             {/* Desktop Auth */}
//             <div className="hidden md:flex items-center space-x-4">
//               {!isLoggedIn ? (
//                 <>
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       setAuthMode("login");
//                       setIsAuthModalOpen(true);
//                     }}
//                   >
//                     Login
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setAuthMode("register");
//                       setIsAuthModalOpen(true);
//                     }}
//                   >
//                     Register
//                   </Button>
//                 </>
//               ) : (
//                 <UserDropdown user={user} onLogout={handleLogout} />
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMobileMenuOpen && (
//             <div className="md:hidden border-t border-gray-200 py-4">
//               <div className="flex flex-col space-y-4">
//                 <a
//                   href="#discover"
//                   className="text-gray-700 hover:text-gray-900 font-medium"
//                 >
//                   DISCOVER
//                 </a>
//                 <a
//                   href="#categories"
//                   className="text-gray-700 hover:text-gray-900 font-medium"
//                 >
//                   BROWSE CATEGORIES
//                 </a>
//                 <a
//                   href="#create"
//                   className="text-gray-700 hover:text-gray-900 font-medium"
//                 >
//                   CREATE DP BANNER
//                 </a>
//                 <a
//                   href="/#"
//                   className="text-gray-700 hover:text-gray-900 font-medium"
//                 >
//                   Help
//                 </a>
//                 {!isLoggedIn ? (
//                   <div className="flex space-x-2 pt-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => {
//                         setAuthMode("login");
//                         setIsAuthModalOpen(true);
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       LOGIN
//                     </Button>
//                     <Button
//                       size="sm"
//                       onClick={() => {
//                         setAuthMode("register");
//                         setIsAuthModalOpen(true);
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       REGISTER
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="pt-2">
//                     <UserDropdown user={user} onLogout={handleLogout} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
//       <div className="bg-sky-100 border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <Button variant="ghost" className="mb-4">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to More
//           </Button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Campaign Info */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardContent className="p-6  bg-sky-100">
//                 {/* Campaign Badge */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                     {campaignData.category}
//                   </Badge>
//                   {campaignData.isTrending && (
//                     <Badge variant="secondary" className="bg-red-100 text-red-800">
//                       Trending
//                     </Badge>
//                   )}
//                 </div>

//                 {/* Campaign Title */}
//                 <h1 className="text-2xl font-bold text-gray-900 mb-4">{campaignData.title}</h1>

//                 {/* Creator Info */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src={campaignData.creator.avatar || "/placeholder.svg"} />
//                     <AvatarFallback>{campaignData.creator.name[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-medium text-gray-900">{campaignData.creator.name}</p>
//                     <p className="text-sm text-gray-500">Campaign Creator</p>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Eye className="h-4 w-4 mr-1" />
//                     {campaignData.viewCount.toLocaleString()} views
//                   </div>
//                   <div className="flex items-center">
//                     <Download className="h-4 w-4 mr-1" />
//                     {campaignData.downloadCount} downloads
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-1" />
//                     {new Date(campaignData.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>

//                 <Separator className="my-6" />

//                 {/* Description */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-2">About this Campaign</h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">{campaignData.description}</p>
//                 </div>

//                 {/* Tags */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {campaignData.tags.map((tag) => (
//                       <Badge key={tag} variant="outline" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 <Separator className="my-6" />

//                 {/* Social Sharing */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Share this Campaign</h3>
//                   <div className="flex space-x-2">
//                     <Button size="sm" variant="outline" onClick={() => handleShare("facebook")} className="flex-1">
//                       <Facebook className="h-4 w-4 mr-1" />
//                       Facebook
//                     </Button>
//                     <Button size="sm" variant="outline" onClick={() => handleShare("twitter")} className="flex-1">
//                       <X className="h-4 w-4 mr-1" />
//                       Twitter 
//                     </Button>
//                     <Button size="sm" variant="outline" onClick={() => handleShare("linkedin")} className="flex-1">
//                       <Linkedin className="h-4 w-4 mr-1" />
//                       LinkedIn
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Main Area - Banner Customization */}
//           <div className="lg:col-span-2">
//             <Card className="mb-8">
//               <CardContent className="p-6">
//                 {/* Banner Preview */}
//                 <div className="mb-6">
//                   <BannerPreview
//                     templateUrl={campaignData.templateUrl}
//                     userPhoto={userPhoto}
//                     userName={userName}
//                     placeholderConfig={campaignData.placeholderConfig}
//                   />
//                 </div>

//                 {/* Photo Upload */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Upload Your Photo</h3>
//                   <PhotoUpload onPhotoUpload={handlePhotoUpload} />
//                 </div>

//                 {/* Name Input */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Your Name</h3>
//                   <Input
//                     placeholder="Enter your name"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="text-lg"
//                   />
//                 </div>

//                 {/* Generate Button */}
//                 <div className="mb-6">
//                   <Button
//                     onClick={handleGenerateBanner}
//                     disabled={isGenerating || !userName.trim()}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
//                     size="lg"
//                   >
//                     {isGenerating ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Generating your banner graphic...
//                       </>
//                     ) : (
//                       <>
//                         <Download className="h-5 w-5 mr-2" />
//                         Generate my banner
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {/* Public Display Checkbox */}
//                 <div className="flex items-center space-x-2 mb-4">
//                   <Checkbox
//                     id="public"
//                     checked={isPublic}
//                     onCheckedChange={(checked) => setIsPublic(checked as boolean)}
//                   />
//                   <label htmlFor="public" className="text-sm text-gray-600">
//                     Display my name and campaign publicly
//                   </label>
//                 </div>

//                 {/* Help Text */}
//                 <p className="text-xs text-gray-500 text-center">
//                   Not sure how to create your personalized graphic?{" "}
//                   <a href="#" className="text-blue-600 hover:underline">
//                     View tutorial
//                   </a>
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Comments Section */}
//             <CommentsSection campaignId={campaignData.id} />

//             {/* Trending Section */}
//             <Card className="mt-8">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Campaigns</h3>
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                   {trendingCampaigns.map((campaign) => (
//                     <Card
//                       key={campaign.id}
//                       className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//                     >
//                       <div className="aspect-video relative">
//                         <img
//                           src={campaign.thumbnail || "/placeholder.svg"}
//                           alt={campaign.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <CardContent className="p-3">
//                         <h4 className="font-medium text-sm mb-1 line-clamp-2">{campaign.title}</h4>
//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           <span>{campaign.category}</span>
//                           <div className="flex items-center">
//                             <Eye className="h-3 w-3 mr-1" />
//                             {campaign.viewCount}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



