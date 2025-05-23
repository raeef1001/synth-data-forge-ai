
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataCard } from '@/components/Community/DataCard';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Filter, Search } from 'lucide-react';

const dummyPosts = [
  {
    id: 1,
    title: "E-commerce User Data Analysis",
    description: "Analysis of user behavior patterns in an e-commerce platform",
    author: "Sarah Johnson",
    avatar: "SJ",
    tags: ["e-commerce", "analytics", "user behavior"],
    likes: 124,
    comments: 23,
    shares: 12,
    type: "visualization",
    preview: "bar"
  },
  {
    id: 2,
    title: "Social Media User Schema",
    description: "Complete schema for a social media application with all necessary user fields",
    author: "Mike Chen",
    avatar: "MC",
    tags: ["schema", "social media", "user profile"],
    likes: 87,
    comments: 16,
    shares: 34,
    type: "schema",
    preview: "schema"
  },
  {
    id: 3,
    title: "COVID-19 Data Trends",
    description: "Visualization of global COVID-19 trends using public datasets",
    author: "Alex Peterson",
    avatar: "AP",
    tags: ["covid", "public health", "global data"],
    likes: 245,
    comments: 41,
    shares: 92,
    type: "visualization",
    preview: "line"
  },
  {
    id: 4,
    title: "E-commerce Product Database",
    description: "Complete schema for products, categories, and inventory management",
    author: "Lisa Wang",
    avatar: "LW",
    tags: ["e-commerce", "products", "inventory"],
    likes: 76,
    comments: 12,
    shares: 28,
    type: "schema",
    preview: "schema"
  }
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Data Community</h1>
              <p className="text-muted-foreground">
                Share, discover and collaborate on data schemas and visualizations
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyPosts.map(post => (
                  <DataCard key={post.id} post={post} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            <TabsContent value="latest" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  View the newest schemas and visualizations from the community.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Following Feed</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Content from creators you follow will appear here.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="my-posts" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">My Shared Content</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Manage and track your shared schemas and visualizations.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
