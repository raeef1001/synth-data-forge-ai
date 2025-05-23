
import React from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ApiKeyDisplay } from '@/components/ApiManagement/ApiKeyDisplay';
import { ApiUsageChart } from '@/components/ApiManagement/ApiUsageChart';

const ApiManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">API Management</h1>
          <p className="text-muted-foreground mb-8">
            Manage your API keys, usage, and security settings
          </p>

          <Tabs defaultValue="keys" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="keys" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your API Keys</CardTitle>
                  <CardDescription>
                    Use these keys to authenticate your API requests. Keep them secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ApiKeyDisplay 
                    name="Production Key" 
                    keyType="production" 
                    created="2023-11-15"
                    lastUsed="2023-12-01" 
                  />
                  
                  <ApiKeyDisplay 
                    name="Development Key" 
                    keyType="development" 
                    created="2023-11-15"
                    lastUsed="2023-12-01" 
                  />
                  
                  <ApiKeyDisplay 
                    name="Testing Key" 
                    keyType="test" 
                    created="2023-11-15"
                    lastUsed="Never" 
                  />
                </CardContent>
                <CardFooter>
                  <Button className="glow-button">Generate New API Key</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Key Permissions</CardTitle>
                  <CardDescription>
                    Control what each API key can access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Select Key</Label>
                      <Select defaultValue="production">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select key" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production">Production Key</SelectItem>
                          <SelectItem value="development">Development Key</SelectItem>
                          <SelectItem value="test">Testing Key</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <h4 className="font-medium mb-4">Access Permissions</h4>
                      <div className="space-y-3">
                        {['Read', 'Write', 'Delete', 'Admin'].map(permission => (
                          <div key={permission} className="flex items-center justify-between">
                            <Label htmlFor={`permission-${permission.toLowerCase()}`}>{permission}</Label>
                            <Switch id={`permission-${permission.toLowerCase()}`} defaultChecked={permission !== 'Admin'} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Permissions</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage Overview</CardTitle>
                  <CardDescription>
                    Monitor your API usage and requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">14,592</div>
                        <p className="text-muted-foreground text-sm">Total Requests (30 days)</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">99.98%</div>
                        <p className="text-muted-foreground text-sm">Uptime</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">124 ms</div>
                        <p className="text-muted-foreground text-sm">Average Response Time</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-[300px]">
                    <ApiUsageChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>
                    Configure rate limits for your API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Requests per minute limit</Label>
                        <span className="font-mono">60</span>
                      </div>
                      <Slider defaultValue={[60]} max={1000} step={10} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Daily request quota</Label>
                        <span className="font-mono">50,000</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={5} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Rate limit behavior</Label>
                        <Select defaultValue="throttle">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select behavior" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="throttle">Throttle</SelectItem>
                            <SelectItem value="block">Block</SelectItem>
                            <SelectItem value="queue">Queue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Security Settings</CardTitle>
                  <CardDescription>
                    Configure security measures for your API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">CORS Configuration</Label>
                        <p className="text-sm text-muted-foreground">
                          Control which domains can access your API
                        </p>
                      </div>
                      <Switch id="cors-enabled" defaultChecked />
                    </div>
                    
                    <Input 
                      placeholder="*"
                      defaultValue="*"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use * for all domains or add specific domains (comma separated)
                    </p>
                  </div>
                  
                  <div className="pt-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">JWT Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable JWT token authentication for API requests
                        </p>
                      </div>
                      <Switch id="jwt-enabled" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Token Expiration</Label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 Hour</SelectItem>
                          <SelectItem value="8h">8 Hours</SelectItem>
                          <SelectItem value="24h">24 Hours</SelectItem>
                          <SelectItem value="7d">7 Days</SelectItem>
                          <SelectItem value="30d">30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" className="w-full">Rotate JWT Secret</Button>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">IP Restrictions</Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict API access to specific IP addresses
                        </p>
                      </div>
                      <Switch id="ip-restrictions" />
                    </div>
                    
                    <Input 
                      placeholder="Add allowed IP addresses (comma separated)"
                      className="mt-2"
                      disabled
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Security Settings</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-4">
                      <Switch id="ddos-protection" defaultChecked />
                      <div>
                        <Label htmlFor="ddos-protection" className="text-base">DDoS Protection</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically detect and block potential DDoS attacks
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Switch id="request-validation" defaultChecked />
                      <div>
                        <Label htmlFor="request-validation" className="text-base">Request Validation</Label>
                        <p className="text-sm text-muted-foreground">
                          Validate incoming requests against schema definitions
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Switch id="encryption" defaultChecked />
                      <div>
                        <Label htmlFor="encryption" className="text-base">Data Encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Encrypt sensitive data in transit and at rest
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Switch id="audit-logging" defaultChecked />
                      <div>
                        <Label htmlFor="audit-logging" className="text-base">Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Log all API access attempts and changes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">API Settings</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Additional API configuration settings will appear here.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="docs" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Interactive documentation for your API endpoints will appear here.
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

export default ApiManagement;
