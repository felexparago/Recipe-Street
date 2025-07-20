export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  createdAt: string;
  lastLogin: string;
  isSubscribed: boolean;
  subscriptionDate?: string;
  isApproved: boolean; // Premium access approval
  approvedAt?: string;
  isCourseApproved?: boolean; // Course approval
  courseApprovedAt?: string;
  cardInfo?: {
    last4: string;
    expiryDate: string;
    cardholderName: string;
    billingAddress: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

class UserDatabase {
  private readonly STORAGE_KEY = 'recipe_street_users';

  // Initialize database
  private getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to storage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  // Create new user
  createUser(name: string, email: string, password: string): User | null {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
      return null;
    }

    const newUser: User = {
      id: this.generateId(),
      name,
      email: email.toLowerCase(),
      password, // In production, hash this password
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isSubscribed: false,
      isApproved: false // New users are not approved by default
    };

    users.push(newUser);
    this.saveUsers(users);
    
    console.log('User created:', { id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  }

  // Find user by email
  findUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // Find user by ID
  findUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  // Update user last login
  updateLastLogin(email: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date().toISOString();
      this.saveUsers(users);
    }
  }

  // Update user subscription status
  updateSubscriptionStatus(userId: string, isSubscribed: boolean): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].isSubscribed = isSubscribed;
      users[userIndex].subscriptionDate = isSubscribed ? new Date().toISOString() : undefined;
      this.saveUsers(users);
    }
  }

  // Update user approval status
  updateApprovalStatus(userId: string, isApproved: boolean): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].isApproved = isApproved;
      users[userIndex].approvedAt = isApproved ? new Date().toISOString() : undefined;
      this.saveUsers(users);
    }
  }

  // Get pending approvals (users who are not approved yet)
  getPendingApprovals(): User[] {
    const users = this.getUsers();
    return users.filter(user => !user.isApproved);
  }

  // Get approved users
  getApprovedUsers(): User[] {
    const users = this.getUsers();
    return users.filter(user => user.isApproved);
  }

  // Get all users (for admin purposes)
  getAllUsers(): User[] {
    return this.getUsers();
  }

  // Delete user (for admin purposes)
  deleteUser(userId: string): boolean {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    if (filteredUsers.length < users.length) {
      this.saveUsers(filteredUsers);
      return true;
    }
    return false;
  }

  // Get user statistics
  getUserStats() {
    const users = this.getUsers();
    const totalUsers = users.length;
    const subscribedUsers = users.filter(user => user.isSubscribed).length;
    const recentUsers = users.filter(user => {
      const createdAt = new Date(user.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt > thirtyDaysAgo;
    }).length;

    return {
      totalUsers,
      subscribedUsers,
      recentUsers,
      subscriptionRate: totalUsers > 0 ? (subscribedUsers / totalUsers * 100).toFixed(1) : '0'
    };
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export users data (for backup)
  exportUsers(): string {
    return JSON.stringify(this.getUsers(), null, 2);
  }

  // Import users data (for restore)
  importUsers(data: string): boolean {
    try {
      const users = JSON.parse(data);
      if (Array.isArray(users)) {
        this.saveUsers(users);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing users:', error);
      return false;
    }
  }
}

// Create singleton instance
export const userDatabase = new UserDatabase(); 