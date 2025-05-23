
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ApiKeyDisplayProps {
  name: string;
  keyType: 'production' | 'development' | 'test';
  created: string;
  lastUsed: string;
}

export const ApiKeyDisplay: React.FC<ApiKeyDisplayProps> = ({
  name,
  keyType,
  created,
  lastUsed
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate a mockup API key based on the key type
  const generateMockApiKey = () => {
    const prefix = keyType === 'production' ? 'prod_' : keyType === 'development' ? 'dev_' : 'test_';
    const randomPart = Array.from({ length: 32 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    return `${prefix}${randomPart}`;
  };

  const apiKey = generateMockApiKey();
  const maskedKey = `${apiKey.slice(0, 8)}${'•'.repeat(28)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard",
    });
  };

  const getBadgeVariant = () => {
    switch (keyType) {
      case 'production':
        return 'default';
      case 'development':
        return 'secondary';
      case 'test':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className="bg-card/50">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{name}</h3>
              <Badge variant={getBadgeVariant()}>{keyType}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Created on {created} · Last used {lastUsed}
            </p>
            <div className="font-mono text-sm bg-muted/30 p-2 rounded border border-border">
              {isVisible ? apiKey : maskedKey}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? "Hide API key" : "Show API key"}
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              aria-label="Copy API key"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
