// Data persistence service for PawPortal
// This service handles localStorage operations for dynamic data

// Initialize data from localStorage or create default data
const initializeData = (key, defaultData) => {
  const storedData = localStorage.getItem(`pawportal_${key}`);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  localStorage.setItem(`pawportal_${key}`, JSON.stringify(defaultData));
  return defaultData;
};

// Save data to localStorage
const saveData = (key, data) => {
  localStorage.setItem(`pawportal_${key}`, JSON.stringify(data));
};

// Pet data management
export const petService = {
  // Initialize pets data
  getPets: () => {
    const defaultPets = [
      {
        id: 1,
        name: "Bella",
        breed: "Golden Retriever",
        age: "2 years",
        image: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29sZGVuJTIwUmV0cmlldmVyJTIwRG9nfGVufDB8fDB8fHww",
        description: "Friendly and playful, loves kids and other pets.",
        diseases: "None",
        allergies: "Chicken",
        owner: "Priya Sharma",
        contact: "priya.sharma@email.com, +91-9876543210",
        status: "Available",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: "Max",
        breed: "Labrador Retriever",
        age: "3 years",
        image: "https://plus.unsplash.com/premium_photo-1710346963816-9f2e6fb4b768?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TGFicmFvZG9yJTIwRG9nfGVufDB8fDB8fHww",
        description: "Energetic and loyal, perfect for active families.",
        diseases: "Hip Dysplasia",
        allergies: "None",
        owner: "Amit Verma",
        contact: "amit.verma@email.com, +91-9123456780",
        status: "Available",
        createdAt: new Date().toISOString()
      }
    ];
    
    return initializeData('pets', defaultPets);
  },

  // Add new pet
  addPet: (petData) => {
    const pets = petService.getPets();
    const newPet = {
      id: pets.length + 1,
      ...petData,
      status: "Available",
      createdAt: new Date().toISOString()
    };
    pets.push(newPet);
    saveData('pets', pets);
    return newPet;
  },

  // Update pet
  updatePet: (id, updates) => {
    const pets = petService.getPets();
    const index = pets.findIndex(pet => pet.id === id);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...updates };
      saveData('pets', pets);
      return pets[index];
    }
    return null;
  },

  // Delete pet
  deletePet: (id) => {
    const pets = petService.getPets();
    const filteredPets = pets.filter(pet => pet.id !== id);
    saveData('pets', filteredPets);
    return filteredPets;
  }
};

// User pets management (pets owned by logged-in user)
export const userPetService = {
  getUserPets: (userId) => {
    const defaultUserPets = [
      {
        id: 1,
        userId: userId,
        name: "Bella",
        breed: "Golden Retriever",
        age: "2 years",
        image: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29sZGVuJTIwUmV0cmlldmVyJTIwRG9nfGVufDB8fDB8fHww",
        description: "Friendly and playful, loves kids and other pets.",
        healthStatus: "Healthy",
        lastCheckup: "2024-01-15",
        nextVaccination: "2024-07-15",
        createdAt: new Date().toISOString()
      }
    ];
    
    const userPets = initializeData(`user_pets_${userId}`, defaultUserPets);
    return userPets;
  },

  addUserPet: (userId, petData) => {
    const userPets = userPetService.getUserPets(userId);
    const newPet = {
      id: userPets.length + 1,
      userId: userId,
      ...petData,
      healthStatus: "Healthy",
      lastCheckup: new Date().toISOString().split('T')[0],
      nextVaccination: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    userPets.push(newPet);
    saveData(`user_pets_${userId}`, userPets);
    return newPet;
  },

  updateUserPet: (userId, petId, updates) => {
    const userPets = userPetService.getUserPets(userId);
    const index = userPets.findIndex(pet => pet.id === petId);
    if (index !== -1) {
      userPets[index] = { ...userPets[index], ...updates };
      saveData(`user_pets_${userId}`, userPets);
      return userPets[index];
    }
    return null;
  }
};

// Health records management
export const healthService = {
  getHealthRecords: (userId) => {
    const defaultRecords = [
      {
        id: 1,
        userId: userId,
        petName: "Bella",
        type: "Vaccination",
        title: "Annual Vaccination",
        date: "2024-01-15",
        vet: "Dr. Smith",
        clinic: "Happy Paws Clinic",
        cost: 85.00,
        description: "Annual vaccination including rabies, distemper, and parvo",
        createdAt: new Date().toISOString()
      }
    ];
    
    return initializeData(`health_records_${userId}`, defaultRecords);
  },

  addHealthRecord: (userId, recordData) => {
    const records = healthService.getHealthRecords(userId);
    const newRecord = {
      id: records.length + 1,
      userId: userId,
      ...recordData,
      createdAt: new Date().toISOString()
    };
    records.push(newRecord);
    saveData(`health_records_${userId}`, records);
    return newRecord;
  }
};

// Reminders management
export const reminderService = {
  getReminders: (userId) => {
    const defaultReminders = [
      {
        id: 1,
        userId: userId,
        petName: "Bella",
        type: "Vaccination",
        title: "Annual Vaccination Due",
        dueDate: "2024-07-15",
        priority: "high",
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    return initializeData(`reminders_${userId}`, defaultReminders);
  },

  addReminder: (userId, reminderData) => {
    const reminders = reminderService.getReminders(userId);
    const newReminder = {
      id: reminders.length + 1,
      userId: userId,
      ...reminderData,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    reminders.push(newReminder);
    saveData(`reminders_${userId}`, reminders);
    return newReminder;
  }
};

// Notifications management
export const notificationService = {
  getNotifications: (userId) => {
    const defaultNotifications = [
      {
        id: 1,
        userId: userId,
        type: "health",
        title: "Bella's Vaccination Due",
        message: "Bella's annual vaccination is due in 3 days. Schedule an appointment now.",
        time: "2 hours ago",
        isRead: false,
        actionUrl: "/vet-booking",
        createdAt: new Date().toISOString()
      }
    ];
    
    return initializeData(`notifications_${userId}`, defaultNotifications);
  },

  addNotification: (userId, notificationData) => {
    const notifications = notificationService.getNotifications(userId);
    const newNotification = {
      id: notifications.length + 1,
      userId: userId,
      ...notificationData,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    notifications.push(newNotification);
    saveData(`notifications_${userId}`, notifications);
    return newNotification;
  },

  markAsRead: (userId, notificationId) => {
    const notifications = notificationService.getNotifications(userId);
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].isRead = true;
      saveData(`notifications_${userId}`, notifications);
    }
  }
};

// Clear all data (for testing/reset)
export const clearAllData = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('pawportal_')) {
      localStorage.removeItem(key);
    }
  });
};
