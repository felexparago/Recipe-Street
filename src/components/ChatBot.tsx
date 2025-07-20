import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChefHat, Clock, Users, Star, Search, BookOpen, Lightbulb, Utensils, Brain, Zap, Target, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'recipe-suggestion' | 'tip' | 'quick-actions' | 'ai-analysis' | 'step-by-step' | 'nutrition-info';
}

interface RecipeSuggestion {
  title: string;
  description: string;
  time: string;
  difficulty: string;
  category: string;
  ingredients?: string[];
  steps?: string[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👨‍🍳 **AI Cooking Assistant Activated!**\n\nI'm your advanced culinary AI, powered by extensive cooking knowledge. I can help you with:\n\n• 🍳 **Recipe Creation & Modification**\n• 🧠 **Ingredient Substitutions & Analysis**\n• 📊 **Nutritional Calculations**\n• 🔬 **Cooking Science & Techniques**\n• 🎯 **Personalized Meal Planning**\n• ⚡ **Quick Problem Solving**\n\nWhat culinary challenge can I help you solve today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    skillLevel: 'beginner',
    dietaryRestrictions: [],
    favoriteCuisines: [],
    cookingGoals: []
  });
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced AI knowledge base with more sophisticated patterns
  const knowledgeBase = {
    greetings: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening", "what's up", "sup", "greetings"
    ],
    recipeQuestions: [
      "recipe", "how to cook", "cooking time", "ingredients", "steps", "instructions", "make", "prepare", "cook", "create", "dish", "meal"
    ],
    cookingTips: [
      "tip", "advice", "help", "troubleshoot", "problem", "issue", "trick", "hack", "secret", "improve", "better", "enhance"
    ],
    dietary: [
      "vegetarian", "vegan", "gluten free", "dairy free", "allergy", "diet", "keto", "paleo", "low carb", "healthy", "nutrition", "calories"
    ],
    equipment: [
      "pan", "pot", "knife", "oven", "stove", "equipment", "tools", "utensils", "appliance", "gadget", "kitchen", "cookware"
    ],
    techniques: [
      "sear", "braise", "roast", "bake", "grill", "fry", "boil", "steam", "sauté", "simmer", "reduce", "deglaze", "poach", "smoke", "cure"
    ],
    ingredients: [
      "substitute", "replacement", "alternative", "ingredient", "spice", "herb", "seasoning", "flavor", "taste", "texture"
    ],
    mealPlanning: [
      "meal plan", "weekly menu", "dinner ideas", "lunch", "breakfast", "meal prep", "planning", "schedule", "budget", "shopping"
    ],
    nutrition: [
      "calories", "protein", "carbs", "fat", "vitamins", "nutrition", "healthy", "balanced", "macros", "micronutrients"
    ],
    science: [
      "why", "science", "chemistry", "physics", "temperature", "reaction", "molecular", "caramelization", "maillard", "emulsification"
    ],
    troubleshooting: [
      "burned", "undercooked", "overcooked", "dry", "soggy", "sticky", "separated", "curdled", "tough", "rubbery", "fix", "save"
    ],
    advanced: [
      "molecular gastronomy", "sous vide", "fermentation", "pickling", "curing", "smoking", "advanced", "professional", "chef", "restaurant"
    ]
  };

  // Enhanced recipe database with more detailed information
  const recipeDatabase: Record<string, RecipeSuggestion[]> = {
    beginner: [
      {
        title: "Perfect Scrambled Eggs",
        description: "Creamy, fluffy scrambled eggs with butter and chives",
        time: "10 min",
        difficulty: "Easy",
        category: "Breakfast",
        ingredients: ["4 large eggs", "2 tbsp butter", "2 tbsp milk", "Salt and pepper", "Fresh chives"],
        steps: [
          "Crack eggs into a bowl and whisk with milk",
          "Melt butter in non-stick pan over medium heat",
          "Pour in eggs and gently stir with spatula",
          "Cook until just set, season with salt and pepper",
          "Garnish with fresh chives and serve immediately"
        ]
      },
      {
        title: "Classic Margherita Pizza",
        description: "Authentic Italian pizza with fresh mozzarella and basil",
        time: "45 min",
        difficulty: "Easy",
        category: "Italian",
        ingredients: ["Pizza dough", "Fresh mozzarella", "Fresh basil", "Tomato sauce", "Olive oil"],
        steps: [
          "Preheat oven to 500°F (260°C)",
          "Roll out pizza dough on floured surface",
          "Spread tomato sauce, add mozzarella slices",
          "Bake for 12-15 minutes until crust is golden",
          "Add fresh basil and drizzle with olive oil"
        ]
      }
    ],
    vegetarian: [
      {
        title: "Mediterranean Quinoa Bowl",
        description: "Nutritious bowl with roasted vegetables and feta",
        time: "25 min",
        difficulty: "Easy",
        category: "Healthy",
        ingredients: ["1 cup quinoa", "Cherry tomatoes", "Cucumber", "Red onion", "Feta cheese", "Olive oil", "Lemon juice"],
        steps: [
          "Cook quinoa according to package instructions",
          "Chop vegetables and mix in bowl",
          "Add cooked quinoa and crumbled feta",
          "Dress with olive oil, lemon juice, salt, and pepper",
          "Serve chilled or at room temperature"
        ]
      }
    ],
    quick: [
      {
        title: "5-Minute Avocado Toast",
        description: "Simple, healthy breakfast with smashed avocado",
        time: "5 min",
        difficulty: "Easy",
        category: "Breakfast",
        ingredients: ["2 slices bread", "1 ripe avocado", "Salt and pepper", "Red pepper flakes", "Lemon juice"],
        steps: [
          "Toast bread until golden brown",
          "Mash avocado with fork, add lemon juice and seasonings",
          "Spread avocado mixture on toast",
          "Sprinkle with red pepper flakes and serve"
        ]
      }
    ]
  };

  // Advanced AI responses with more context and personality
  const aiResponses = {
    greetings: [
      "Hello! I'm your AI culinary companion, ready to help you create amazing dishes. What's on your mind today?",
      "Hi there! I've been analyzing thousands of recipes and cooking techniques. What culinary challenge can I help you solve?",
      "Greetings! I'm here to elevate your cooking game with AI-powered insights and personalized recommendations."
    ],
    recipeQuestions: [
      "I'd love to help you create something amazing! Let me analyze your preferences and suggest the perfect recipe. What type of dish are you craving?",
      "Excellent choice! I can help you craft a recipe that matches your skill level and available ingredients. What's your cooking experience?",
      "I have access to a vast database of recipes and can customize them to your needs. What flavors or cuisines are you interested in?"
    ],
    cookingTips: [
      "Here are my AI-optimized cooking tips: 1) **Mise en place** - prep everything first, 2) **Temperature control** is crucial for consistent results, 3) **Season in layers** for depth of flavor, 4) **Rest meat** after cooking for juiciness, 5) **Use a timer** to prevent overcooking, 6) **Taste as you go** to adjust seasoning.",
      "My advanced cooking insights: **Maillard reaction** creates flavor complexity, **acid balance** brightens dishes, **texture contrast** adds interest, and **umami** enhances overall satisfaction. What specific technique would you like to master?",
      "Pro AI tip: **Sous vide** ensures perfect doneness, **reverse searing** creates amazing crusts, and **brining** improves moisture retention. Which technique interests you most?"
    ],
    dietary: [
      "I can help you navigate dietary restrictions with AI-powered substitutions and alternative recipes. What specific requirements do you have? I know excellent options for all dietary needs.",
      "My database includes thousands of dietary-friendly recipes. I can suggest alternatives for any ingredient and create balanced meals that meet your nutritional goals.",
      "I understand the importance of dietary restrictions. Let me analyze your needs and provide personalized recommendations that are both delicious and compliant."
    ],
    equipment: [
      "Having the right tools makes cooking much easier! For beginners, I recommend: a good chef's knife, cutting board, non-stick pan, pot, and measuring cups. What specific equipment are you asking about?",
      "I can help you understand different cooking equipment and how to use them properly. What tool are you curious about?",
      "Good equipment is an investment in your cooking journey. Start with the basics and build your collection over time!"
    ],
    techniques: [
      "Cooking techniques are the foundation of great food! Here are some essential ones: Searing (high heat, quick cooking), Braising (low heat, long cooking), Roasting (dry heat in oven), and Sautéing (quick cooking in pan). Which interests you?",
      "I can explain different cooking methods and when to use them. Each technique brings out different flavors and textures!",
      "Mastering cooking techniques will take your dishes to the next level. What specific method would you like to learn?"
    ],
    ingredients: [
      "I can help with ingredient substitutions! Common swaps: buttermilk (milk + lemon), buttermilk (yogurt), eggs (flax seeds), cream (coconut milk), and flour (almond flour for gluten-free). What do you need to substitute?",
      "Ingredient substitutions can save the day! Let me know what you're missing and I'll suggest alternatives.",
      "I know lots of ingredient swaps and alternatives. What ingredient are you looking to replace?"
    ],
    mealPlanning: [
      "Meal planning can save time and money! Start by planning 3-4 meals per week, prep ingredients in advance, and cook in batches. What type of meals are you planning for?",
      "I can help you plan meals for the week! Consider your schedule, dietary needs, and what you enjoy eating. What's your typical week like?",
      "Great idea to plan ahead! I can suggest recipes that work well for meal prep and batch cooking."
    ],
    nutrition: [
      "I can help you understand the nutritional aspects of cooking! Focus on whole foods, balance your plate with protein, carbs, and vegetables, and don't forget healthy fats. What nutritional goals do you have?",
      "Cooking at home is one of the best ways to control your nutrition! I can suggest recipes that fit your dietary goals.",
      "Nutrition is important! I can help you make healthier choices while still enjoying delicious food."
    ],
    science: [
      "Ah, the science of cooking! Here's what's happening: **Maillard reaction** (browning) occurs at 140°C, **caramelization** starts at 160°C, and **protein denaturation** happens at 60°C. Understanding these reactions helps you control flavor development.",
      "Cooking science is fascinating! **Emulsification** creates stable mixtures (like mayonnaise), **gelatinization** thickens sauces, and **coagulation** firms up proteins. Which reaction interests you?",
      "The molecular level of cooking: **Heat transfer** affects cooking speed, **osmosis** draws out moisture, and **enzymatic reactions** tenderize meat. This knowledge helps you troubleshoot and improve your cooking."
    ],
    troubleshooting: [
      "Let me analyze your cooking issue. Common problems and AI-recommended solutions: **Burned food** - lower heat and use timers, **Undercooked** - check internal temperatures, **Dry meat** - rest after cooking and use proper cuts, **Soggy vegetables** - high heat and minimal water.",
      "I can help you fix cooking disasters! **Curdled sauce** - add cold liquid slowly, **Separated dressing** - whisk vigorously, **Tough meat** - use proper cooking methods and rest time, **Bland food** - layer seasonings and add acid.",
      "My troubleshooting algorithm suggests: **Sticky rice** - rinse before cooking, **Rubbery eggs** - lower heat and gentle stirring, **Burnt bottom** - use proper pan and heat control. What specific issue are you facing?"
    ],
    advanced: [
      "For advanced techniques, I recommend: **Sous vide** for perfect doneness, **Molecular gastronomy** for texture manipulation, **Fermentation** for flavor development, and **Smoking** for depth. Which advanced method interests you?",
      "Professional-level cooking involves: **Precision temperature control**, **Advanced knife skills**, **Flavor balancing**, and **Plating techniques**. I can guide you through any of these skills.",
      "Advanced culinary techniques: **Spherification** for unique textures, **Dehydration** for concentrated flavors, **Infusion** for enhanced aromas, and **Emulsification** for stable sauces. What would you like to explore?"
    ],
    default: [
      "That's an interesting question! As your AI cooking assistant, I'm here to help with any culinary challenge. Try asking about recipes, techniques, troubleshooting, or cooking science!",
      "I'd love to help you with your cooking questions! My AI is trained on extensive culinary knowledge. What specific aspect of cooking can I assist you with?",
      "I'm your advanced culinary AI, ready to help with recipes, techniques, and cooking science. What would you like to explore today?"
    ]
  };

  // Enhanced quick actions with AI-powered features
  const quickActions = [
    { text: "AI Recipe Creator", icon: "🧠", description: "Create custom recipes" },
    { text: "Cooking Science", icon: "🔬", description: "Learn the why behind cooking" },
    { text: "Troubleshooting", icon: "🔧", description: "Fix cooking problems" },
    { text: "Nutrition Analysis", icon: "📊", description: "Calculate nutritional info" },
    { text: "Ingredient Substitutions", icon: "🔄", description: "Find alternatives" },
    { text: "Meal Planning", icon: "📅", description: "Plan your week" }
  ];

  // Advanced AI response generation with context awareness
  const generateAIResponse = (userMessage: string): { text: string; type: Message['type'] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update conversation context
    setConversationContext(prev => [...prev.slice(-5), lowerMessage]);
    
    // Check for greetings
    if (knowledgeBase.greetings.some(greeting => lowerMessage.includes(greeting))) {
      return {
        text: aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)],
        type: 'text'
      };
    }
    
    // Check for recipe questions with AI analysis
    if (knowledgeBase.recipeQuestions.some(term => lowerMessage.includes(term))) {
      if (lowerMessage.includes('quick') || lowerMessage.includes('fast') || lowerMessage.includes('easy')) {
        return {
          text: "🧠 **AI Analysis Complete!**\n\nBased on your request for quick recipes, I've identified these optimal options that balance speed, nutrition, and flavor:",
          type: 'recipe-suggestion'
        };
      }
      return {
        text: aiResponses.recipeQuestions[Math.floor(Math.random() * aiResponses.recipeQuestions.length)],
        type: 'text'
      };
    }
    
    // Check for cooking science questions
    if (knowledgeBase.science.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.science[Math.floor(Math.random() * aiResponses.science.length)],
        type: 'ai-analysis'
      };
    }
    
    // Check for troubleshooting
    if (knowledgeBase.troubleshooting.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.troubleshooting[Math.floor(Math.random() * aiResponses.troubleshooting.length)],
        type: 'tip'
      };
    }
    
    // Check for advanced techniques
    if (knowledgeBase.advanced.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.advanced[Math.floor(Math.random() * aiResponses.advanced.length)],
        type: 'ai-analysis'
      };
    }
    
    // Check for cooking tips
    if (knowledgeBase.cookingTips.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.cookingTips[Math.floor(Math.random() * aiResponses.cookingTips.length)],
        type: 'tip'
      };
    }
    
    // Check for dietary questions
    if (knowledgeBase.dietary.some(term => lowerMessage.includes(term))) {
      if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan')) {
        return {
          text: "🌱 **AI Dietary Analysis Complete!**\n\nI've identified these excellent vegetarian recipes that provide complete nutrition and amazing flavor:",
          type: 'recipe-suggestion'
        };
      }
      return {
        text: aiResponses.dietary[Math.floor(Math.random() * aiResponses.dietary.length)],
        type: 'text'
      };
    }
    
    // Check for equipment questions
    if (knowledgeBase.equipment.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.equipment[Math.floor(Math.random() * aiResponses.equipment.length)],
        type: 'text'
      };
    }
    
    // Check for technique questions
    if (knowledgeBase.techniques.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.techniques[Math.floor(Math.random() * aiResponses.techniques.length)],
        type: 'text'
      };
    }
    
    // Check for ingredient questions
    if (knowledgeBase.ingredients.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.ingredients[Math.floor(Math.random() * aiResponses.ingredients.length)],
        type: 'text'
      };
    }
    
    // Check for meal planning
    if (knowledgeBase.mealPlanning.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.mealPlanning[Math.floor(Math.random() * aiResponses.mealPlanning.length)],
        type: 'text'
      };
    }
    
    // Check for nutrition
    if (knowledgeBase.nutrition.some(term => lowerMessage.includes(term))) {
      return {
        text: aiResponses.nutrition[Math.floor(Math.random() * aiResponses.nutrition.length)],
        type: 'nutrition-info'
      };
    }
    
    // Default AI response
    return {
      text: aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)],
      type: 'text'
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing with typing delay
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        type: response.type
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500); // Slightly longer delay to simulate AI processing
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let response: Message;
      
      switch (action) {
        case "AI Recipe Creator":
          response = {
            id: (Date.now() + 1).toString(),
            text: "🧠 **AI Recipe Creator Activated!**\n\nI can create custom recipes based on your preferences, available ingredients, and dietary needs. Tell me:\n\n• What ingredients do you have?\n• Any dietary restrictions?\n• Preferred cuisine or style?\n• Cooking time available?\n\nI'll craft a personalized recipe just for you!",
            isUser: false,
            timestamp: new Date(),
            type: 'ai-analysis'
          };
          break;
        case "Cooking Science":
          response = {
            id: (Date.now() + 1).toString(),
            text: "🔬 **Cooking Science Lab Open!**\n\nLet me explain the fascinating science behind cooking:\n\n• **Maillard Reaction**: Browning creates complex flavors\n• **Protein Denaturation**: Heat changes protein structure\n• **Emulsification**: Combining oil and water\n• **Gelatinization**: Starch thickening\n• **Caramelization**: Sugar breakdown\n\nWhat scientific aspect interests you most?",
            isUser: false,
            timestamp: new Date(),
            type: 'ai-analysis'
          };
          break;
        case "Troubleshooting":
          response = {
            id: (Date.now() + 1).toString(),
            text: "🔧 **AI Troubleshooting System Online!**\n\nI can help you fix any cooking problem. Common issues I can solve:\n\n• **Burned food** - Heat control solutions\n• **Undercooked** - Temperature and timing fixes\n• **Dry meat** - Moisture retention techniques\n• **Soggy vegetables** - Crispness methods\n• **Separated sauces** - Emulsification fixes\n\nWhat cooking problem are you facing?",
            isUser: false,
            timestamp: new Date(),
            type: 'tip'
          };
          break;
        case "Nutrition Analysis":
          response = {
            id: (Date.now() + 1).toString(),
            text: "📊 **Nutrition Analysis Engine Ready!**\n\nI can calculate nutritional information for any recipe or meal:\n\n• **Macronutrients**: Protein, carbs, fats\n• **Micronutrients**: Vitamins and minerals\n• **Calorie counting**: Accurate calculations\n• **Dietary compliance**: Check against restrictions\n• **Balanced meals**: Optimal nutrition ratios\n\nWhat would you like me to analyze?",
            isUser: false,
            timestamp: new Date(),
            type: 'nutrition-info'
          };
          break;
        case "Ingredient Substitutions":
          response = {
            id: (Date.now() + 1).toString(),
            text: "🔄 **Substitution Database Active!**\n\nI can find perfect ingredient alternatives:\n\n• **Dairy substitutes**: Plant-based options\n• **Gluten-free alternatives**: Flour replacements\n• **Egg substitutes**: Binding alternatives\n• **Sugar alternatives**: Natural sweeteners\n• **Herb substitutions**: Flavor alternatives\n\nWhat ingredient do you need to replace?",
            isUser: false,
            timestamp: new Date(),
            type: 'text'
          };
          break;
        case "Meal Planning":
          response = {
            id: (Date.now() + 1).toString(),
            text: "📅 **AI Meal Planning Assistant Ready!**\n\nI can create personalized meal plans based on:\n\n• **Your schedule**: Quick vs elaborate meals\n• **Dietary needs**: Restrictions and preferences\n• **Budget considerations**: Cost-effective options\n• **Nutritional goals**: Balanced and healthy\n• **Family size**: Portion planning\n\nWhat's your typical week like?",
            isUser: false,
            timestamp: new Date(),
            type: 'text'
          };
          break;
        default:
          response = {
            id: (Date.now() + 1).toString(),
            text: "I can help you with that! What specific information do you need?",
            isUser: false,
            timestamp: new Date(),
            type: 'text'
          };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'recipe-suggestion') {
      return (
        <div className="space-y-3">
          <p className="text-sm whitespace-pre-line">{message.text}</p>
          <div className="grid grid-cols-1 gap-3">
            {recipeDatabase.quick.map((recipe, index) => (
              <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-amber-800">{recipe.title}</h4>
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-sm text-amber-700 mb-2">{recipe.description}</p>
                <div className="flex items-center space-x-4 text-xs text-amber-600">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {recipe.time}
                  </span>
                  <span className="flex items-center">
                    <Utensils className="h-3 w-3 mr-1" />
                    {recipe.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'tip') {
      return (
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-2">💡 AI Cooking Tip</p>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'ai-analysis') {
      return (
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Brain className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-purple-800 mb-2">🧠 AI Analysis</p>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'nutrition-info') {
      return (
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Target className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800 mb-2">📊 Nutrition Analysis</p>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'quick-actions') {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.text)}
                className="bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-800 text-xs p-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <span>{action.icon}</span>
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-sm whitespace-pre-line">{message.text}</p>;
  };

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
        aria-label="Open AI chat"
      >
        <div className="relative">
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Enhanced Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[500px] flex flex-col">
            {/* Enhanced Chat Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Cooking Assistant</h3>
                  <p className="text-sm text-amber-100">Powered by Advanced AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-amber-100 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {renderMessage(message)}
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-amber-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-purple-500 animate-pulse" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">AI-powered features:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.text)}
                      className="bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-800 text-xs p-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1"
                      title={action.description}
                    >
                      <span>{action.icon}</span>
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your AI cooking assistant..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 