
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface DataCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    author: string;
    avatar: string;
    tags: string[];
    likes: number;
    comments: number;
    shares: number;
    type: string;
    preview: string;
  };
}

export const DataCard: React.FC<DataCardProps> = ({ post }) => {
  // Function to render preview based on post type
  const renderPreview = () => {
    if (post.type === 'visualization') {
      const colors = {
        'bar': '#22c55e',
        'line': '#14b8a6',
        'pie': '#8b5cf6'
      };
      const color = colors[post.preview as keyof typeof colors] || '#22c55e';

      if (post.preview === 'bar') {
        return (
          <div className="h-full flex items-end justify-around py-2">
            {[40, 65, 30, 85, 50].map((height, i) => (
              <div key={i} style={{ height: `${height}%`, width: '15%', backgroundColor: color }} className="rounded-t-sm"></div>
            ))}
          </div>
        );
      } else if (post.preview === 'line') {
        return (
          <div className="h-full flex items-center justify-center">
            <svg width="100%" height="70%" viewBox="0 0 100 50">
              <polyline
                points="0,35 20,25 40,30 60,10 80,20 100,15"
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
            </svg>
          </div>
        );
      } else {
        // Default or pie
        return (
          <div className="h-full flex items-center justify-center">
            <svg width="70%" height="70%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill={color} opacity="0.7" />
              <path
                d="M50,10 A40,40 0 0,1 90,50 L50,50 Z"
                fill={color}
              />
            </svg>
          </div>
        );
      }
    } else {
      // Schema preview
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-1 px-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="h-2 bg-primary/40 rounded w-full"></div>
                <div className="h-2 bg-primary/20 rounded w-full"></div>
                <div className="h-2 bg-primary/30 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-2 bg-primary/50 rounded"></div>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
      <div className="h-40 bg-muted/30 relative">
        {renderPreview()}
        <Badge 
          className="absolute top-2 right-2" 
          variant={post.type === 'schema' ? 'outline' : 'default'}
        >
          {post.type === 'schema' ? 'Schema' : 'Visualization'}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
            <div className="flex items-center mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.avatar}`} />
                <AvatarFallback>{post.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{post.author}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && <Badge variant="secondary" className="text-xs">+{post.tags.length - 3}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
            <Share2 className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
