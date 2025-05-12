"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'StyleHub',
    storeEmail: 'contact@stylehub.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Fashion Street, Style City, SC 12345',
    currency: 'USD',
    enableFeaturedProducts: true,
    enableNewArrivals: true,
    enableSaleProducts: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderConfirmations: true,
    orderStatusUpdates: true,
    lowStockAlerts: true,
    newCustomerSignups: true,
    marketingEmails: false
  });

  const [paymentSettings, setPaymentSettings] = useState({
    paypalEmail: 'payments@stylehub.com',
    stripePublicKey: 'pk_test_example',
    stripeSecretKey: 'sk_test_•••••••••••••••',
    enablePaypal: true,
    enableStripe: true,
    enableCashOnDelivery: true
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleToggleChange = (setting: string, value: boolean, settingType: 'general' | 'notification' | 'payment') => {
    if (settingType === 'general') {
      setGeneralSettings({
        ...generalSettings,
        [setting]: value
      });
    } else if (settingType === 'notification') {
      setNotificationSettings({
        ...notificationSettings,
        [setting]: value
      });
    } else if (settingType === 'payment') {
      setPaymentSettings({
        ...paymentSettings,
        [setting]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: `Your ${type} settings have been updated successfully.`,
    });
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
    <TabsList>
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
      <TabsTrigger value="payment">Payment</TabsTrigger>
      <TabsTrigger value="appearance">Appearance</TabsTrigger>
    </TabsList>

    {/* General Settings */}
    <TabsContent value="general">
      <Card className='border border-border'>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your store details and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, 'general')}>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input 
                  id="storeName" 
                  name="storeName" 
                  value={generalSettings.storeName} 
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input 
                  id="storeEmail" 
                  name="storeEmail" 
                  type="email" 
                  value={generalSettings.storeEmail} 
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={generalSettings.phoneNumber} 
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Store Address</Label>
                <Textarea 
                  id="address" 
                  name="address" 
                  value={generalSettings.address} 
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input 
                  id="currency" 
                  name="currency" 
                  value={generalSettings.currency} 
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Homepage Features</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableFeaturedProducts" className="flex-1">
                    Display Featured Products
                  </Label>
                  <Switch 
                    id="enableFeaturedProducts" 
                    checked={generalSettings.enableFeaturedProducts}
                    onCheckedChange={(checked) => 
                      handleToggleChange('enableFeaturedProducts', checked, 'general')
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableNewArrivals" className="flex-1">
                    Display New Arrivals
                  </Label>
                  <Switch 
                    id="enableNewArrivals" 
                    checked={generalSettings.enableNewArrivals}
                    onCheckedChange={(checked) => 
                      handleToggleChange('enableNewArrivals', checked, 'general')
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableSaleProducts" className="flex-1">
                    Display Sale Products
                  </Label>
                  <Switch 
                    id="enableSaleProducts" 
                    checked={generalSettings.enableSaleProducts}
                    onCheckedChange={(checked) => 
                      handleToggleChange('enableSaleProducts', checked, 'general')
                    }
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save General Settings</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Notifications Settings */}
    <TabsContent value="notifications">
      <Card className='border border-border'>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure which notifications {"you'd"} like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, 'notification')}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="flex-1">
                  Email Notifications
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </Label>
                <Switch 
                  id="emailNotifications" 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    handleToggleChange('emailNotifications', checked, 'notification')
                  }
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="orderConfirmations" className="flex-1">
                  Order Confirmations
                  <p className="text-sm text-muted-foreground">Get notified when a new order is placed</p>
                </Label>
                <Switch 
                  id="orderConfirmations" 
                  checked={notificationSettings.orderConfirmations}
                  onCheckedChange={(checked) => 
                    handleToggleChange('orderConfirmations', checked, 'notification')
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="orderStatusUpdates" className="flex-1">
                  Order Status Updates
                  <p className="text-sm text-muted-foreground">Get notified when order status changes</p>
                </Label>
                <Switch 
                  id="orderStatusUpdates" 
                  checked={notificationSettings.orderStatusUpdates}
                  onCheckedChange={(checked) => 
                    handleToggleChange('orderStatusUpdates', checked, 'notification')
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="lowStockAlerts" className="flex-1">
                  Low Stock Alerts
                  <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                </Label>
                <Switch 
                  id="lowStockAlerts" 
                  checked={notificationSettings.lowStockAlerts}
                  onCheckedChange={(checked) => 
                    handleToggleChange('lowStockAlerts', checked, 'notification')
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="newCustomerSignups" className="flex-1">
                  New Customer Signups
                  <p className="text-sm text-muted-foreground">Get notified when new customers register</p>
                </Label>
                <Switch 
                  id="newCustomerSignups" 
                  checked={notificationSettings.newCustomerSignups}
                  onCheckedChange={(checked) => 
                    handleToggleChange('newCustomerSignups', checked, 'notification')
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="marketingEmails" className="flex-1">
                  Marketing Emails
                  <p className="text-sm text-muted-foreground">Receive promotional and marketing updates</p>
                </Label>
                <Switch 
                  id="marketingEmails" 
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => 
                    handleToggleChange('marketingEmails', checked, 'notification')
                  }
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Notification Settings</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Payment Settings */}
    <TabsContent value="payment">
      <Card className='border border-border'>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure payment methods and options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, 'payment')}>
            <div className="space-y-4">
              {/* PayPal Settings */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enablePaypal" className="flex-1 font-medium">
                    PayPal
                  </Label>
                  <Switch 
                    id="enablePaypal" 
                    checked={paymentSettings.enablePaypal}
                    onCheckedChange={(checked) => 
                      handleToggleChange('enablePaypal', checked, 'payment')
                    }
                  />
                </div>
                
                {paymentSettings.enablePaypal && (
                  <div className="pl-4 border-l-2 border-muted mt-2 space-y-2">
                    <div className="grid gap-2">
                      <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                      <Input
                        id="paypalEmail"
                        value={paymentSettings.paypalEmail}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paypalEmail: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {/* Stripe Settings */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableStripe" className="flex-1 font-medium">
                    Stripe
                  </Label>
                  <Switch 
                    id="enableStripe" 
                    checked={paymentSettings.enableStripe}
                    onCheckedChange={(checked) => 
                      handleToggleChange('enableStripe', checked, 'payment')
                    }
                  />
                </div>
                
                {paymentSettings.enableStripe && (
                  <div className="pl-4 border-l-2 border-muted mt-2 space-y-2">
                    <div className="grid gap-2">
                      <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                      <Input
                        id="stripePublicKey"
                        value={paymentSettings.stripePublicKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, stripePublicKey: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        type="password"
                        value={paymentSettings.stripeSecretKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        For security reasons, your secret key is only partially displayed
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {/* Cash on Delivery */}
              <div className="flex items-center justify-between">
                <Label htmlFor="enableCashOnDelivery" className="flex-1">
                  Cash on Delivery
                  <p className="text-sm text-muted-foreground">Allow customers to pay when they receive their order</p>
                </Label>
                <Switch 
                  id="enableCashOnDelivery" 
                  checked={paymentSettings.enableCashOnDelivery}
                  onCheckedChange={(checked) => 
                    handleToggleChange('enableCashOnDelivery', checked, 'payment')
                  }
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Payment Settings</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Appearance Settings */}
    <TabsContent value="appearance">
      <Card className='border border-border'>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize how your store looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Theme Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {['#8884d8', '#82ca9d', '#FF8042', '#0088FE', '#00C49F'].map((color) => (
                  <Button 
                    key={color}
                    type="button" 
                    variant="outline" 
                    className="h-8 w-8 rounded-full p-0 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <span className="sr-only">Select color {color}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Logo</Label>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold">SH</span>
                  </div>
                  <Button variant="outline" className="h-16">Upload New Logo</Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Banner Images</Label>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-16 w-32 rounded-md border bg-muted flex items-center justify-center text-xs">
                    homepage-banner.jpg
                  </div>
                  <Button variant="outline">Manage Banners</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => toast({
            title: "Settings saved",
            description: "Your appearance settings have been updated successfully."
          })}>Save Appearance Settings</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
  );
};

export default AdminSettingsPage;
