const WEBHOOK_URL = 'https://hook.eu2.make.com/iv3my3683g4jj6p66qgwdggyf6plblum';

export interface WebhookData {
  type: 'experience' | 'signin' | 'subscribe' | 'payment' | 'contact';
  timestamp: string;
  userAgent: string;
  data: any;
}

export const sendToWebhook = async (data: WebhookData): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Webhook data sent successfully:', data);
      return true;
    } else {
      console.error('Webhook request failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending webhook data:', error);
    return false;
  }
};

export const captureUserData = (type: WebhookData['type'], formData: any) => {
  const webhookData: WebhookData = {
    type,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    data: formData
  };

  // Send to webhook
  sendToWebhook(webhookData);
  
  // Also log locally for debugging
  console.log('Captured user data:', webhookData);
}; 