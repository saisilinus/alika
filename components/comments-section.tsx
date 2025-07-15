"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
} from "@/features";

interface CommentsSectionProps {
  campaignId: string;
}

export default function CommentsSection({ campaignId }: CommentsSectionProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // RTK Query hooks
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useGetCommentsQuery({
    campaignId,
  });

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [likeComment] = useLikeCommentMutation();

  const handleSubmitComment = async () => {
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to post a comment.",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        title: "Comment required",
        description: "Please enter a comment before submitting.",
      });
      return;
    }

    try {
      await createComment({
        campaignId,
        content: newComment.trim(),
      }).unwrap();

      setNewComment("");
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post comment. Please try again.",
      });
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to like comments.",
      });
      return;
    }

    try {
      await likeComment({ commentId }).unwrap();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like comment.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Comments ({comments?.comments?.length || 0})
            </CardTitle>
            <CardDescription>
              Share your thoughts about this campaign
            </CardDescription>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || "/placeholder.svg"} />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder={
                  session
                    ? "Share your thoughts..."
                    : "Please log in to comment"
                }
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!session}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!session || !newComment.trim() || isCreating}
                  size="sm"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        {commentsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  <div className="h-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : commentsError ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error loading comments</p>
          </div>
        ) : comments && comments.comments.length > 0 ? (
          <div className="space-y-6">
            {comments.comments.map((comment) => (
              <div
                key={comment._id?.toString()}
                className="flex items-start space-x-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment.user?.image || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {comment.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {comment.user?.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {!comment.isApproved && (
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment._id!.toString())}
                      className={`text-xs ${"text-gray-500"}`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${""}`} />
                      {comment.likes || 0}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-500"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No comments yet
            </h3>
            <p className="text-gray-600">
              Be the first to share your thoughts about this campaign!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
