import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    if (response.ok) {
      const cookies = response.headers.get('set-cookie');
      res.setHeader('Set-Cookie', cookies); 
      return res.status(200).json({ message: 'Logged in to Drupal' });
    } else {
      return res.status(500).json({ message: 'Failed to log in to Drupal' });
    }
  } catch (error) {
    console.error('Error logging in to Drupal:', error);
    return res.status(500).json({ message: 'Failed to log in to Drupal' });
  }
};
