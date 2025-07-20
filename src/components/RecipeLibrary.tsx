import React, { useState, useContext } from 'react';
import { Clock, Users, Star, Lock, Play, X, Filter as FilterIcon } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import Reviews from './Reviews';

const RecipeLibrary = () => {
  const [filter, setFilter] = useState('all');
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCoursePayment, setShowCoursePayment] = useState(false);
  const [moreFilter, setMoreFilter] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);
  const { user } = useContext(AuthContext);

  const recipes = [
    {
      id: 1,
      title: "Beef Wellington",
      description: "Tender beef fillet wrapped in puff pastry with mushroom duxelles",
      image: "/recipe 1.jpg",
      time: "2 hours",
      servings: 6,
      rating: 4.9,
      type: "premium",
      category: "British",
      hasVideo: true,
      ingredients: [
        "Beef fillet",
        "Puff pastry",
        "Mushroom duxelles",
        "Red wine reduction sauce",
        "Butter",
        "Salt",
        "Pepper"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "Season beef fillet with salt and pepper.",
        "Heat butter in a pan and sear beef on all sides.",
        "Remove beef and add mushroom duxelles to the pan.",
        "Cook until mushrooms are golden.",
        "Wrap beef in puff pastry and seal.",
        "Bake for 1 hour.",
        "Rest for 10 minutes before carving.",
        "Serve with red wine reduction sauce."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 2,
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate cake with a molten center, served warm",
      image: "/download (3).png",
      time: "25 min",
      servings: 2,
      rating: 4.7,
      type: "free",
      category: "Dessert",
      hasVideo: false,
      ingredients: [
        "Dark chocolate",
        "Butter",
        "Sugar",
        "Eggs",
        "Flour",
        "Baking powder"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "Melt dark chocolate and butter.",
        "Mix sugar, eggs, and melted chocolate.",
        "Sift flour and baking powder.",
        "Add to the chocolate mixture and mix well.",
        "Pour into a prepared ramekin.",
        "Bake for 15-18 minutes.",
        "Serve warm with cream."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 3,
      title: "Chicken Tikka Masala",
      description: "Creamy Indian curry with tender chicken and aromatic spices",
      image: "/recipe 7.jpg",
      time: "50 min",
      servings: 4,
      rating: 4.7,
      type: "free",
      category: "Indian",
      hasVideo: true,
      ingredients: [
        "Chicken breast",
        "Yogurt",
        "Onions",
        "Garlic",
        "Ginger",
        "Tomatoes",
        "Cream",
        "Spices (cumin, coriander, turmeric)"
      ],
      steps: [
        "Marinate chicken in spices and yogurt.",
        "Grill chicken.",
        "Sauté onions and garlic.",
        "Add tomatoes and spices.",
        "Simmer until creamy."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 4,
      title: "Sushi Master Class",
      description: "Learn to make authentic nigiri and maki rolls like a professional",
      image: "/download (5).png",
      time: "1.5 hours",
      servings: 4,
      rating: 5.0,
      type: "premium",
      category: "Japanese",
      hasVideo: true,
      ingredients: [
        "Rice vinegar",
        "Sugar",
        "Salt",
        "Sushi rice",
        "Nori sheets",
        "Fillings (e.g., tuna, salmon, cucumber, avocado)"
      ],
      steps: [
        "Prepare sushi rice.",
        "Mix vinegar, sugar, and salt.",
        "Roll sushi on a bamboo mat.",
        "Cut into pieces.",
        "Serve with wasabi, soy sauce, and pickled ginger."
      ],
      filters: ["Pregnant mothers", "Nationality food", "Diet"]
    },
    {
      id: 5,
      title: "Mediterranean Quinoa Bowl",
      description: "Healthy and colorful bowl with roasted vegetables and tahini dressing",
      image: "/recipe 8.jpg",
      time: "20 min",
      servings: 2,
      rating: 4.6,
      type: "free",
      category: "Healthy",
      hasVideo: false,
      ingredients: [
        "Quinoa",
        "Bell peppers",
        "Zucchini",
        "Tomatoes",
        "Olive oil",
        "Tahini dressing"
      ],
      steps: [
        "Cook quinoa.",
        "Roast vegetables in the oven.",
        "Mix tahini dressing.",
        "Combine all ingredients."
      ],
      filters: ["Vegetarian", "Lactose Intolerant", "Diet"]
    },
    {
      id: 6,
      title: "Lobster Thermidor",
      description: "Luxurious French dish with lobster meat in a rich cream sauce",
      image: "/recipe 9.jpg",
      time: "1.5 hours",
      servings: 2,
      rating: 5.0,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Lobster",
        "Butter",
        "Cream",
        "Garlic",
        "Parsley",
        "Lemon juice"
      ],
      steps: [
        "Cook lobster in a rich cream sauce.",
        "Serve with garlic butter and parsley."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 7,
      title: "Classic Margherita Pizza",
      description: "Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce",
      image: "/download (4).png",
      time: "30 min",
      servings: 4,
      rating: 4.8,
      type: "free",
      category: "Italian",
      hasVideo: true,
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella",
        "Fresh basil leaves",
        "Olive oil",
        "Salt"
      ],
      steps: [
        "Preheat oven to 475°F (245°C).",
        "Spread tomato sauce over the dough.",
        "Add mozzarella slices and basil leaves.",
        "Drizzle with olive oil and sprinkle with salt.",
        "Bake for 10-12 minutes until crust is golden.",
        "Slice and serve hot."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 8,
      title: "French Macarons",
      description: "Delicate almond cookies with ganache filling in various flavors",
      image: "/recipe 5.jpg",
      time: "3 hours",
      servings: 24,
      rating: 4.9,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Almond flour",
        "Powdered sugar",
        "Egg whites",
        "Granulated sugar",
        "Ganache filling (e.g., chocolate, raspberry)"
      ],
      steps: [
        "Sift almond flour and powdered sugar.",
        "Beat egg whites until stiff peaks.",
        "Fold into almond mixture.",
        "Pipe onto baking sheets.",
        "Bake at 150°C (300°F) for 15-20 minutes.",
        "Let cool, then fill with ganache."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 9,
      title: "Thai Green Curry",
      description: "Aromatic curry with coconut milk, vegetables, and your choice of protein",
      image: "/download (1).png",
      time: "45 min",
      servings: 4,
      rating: 4.7,
      type: "free",
      category: "Thai",
      hasVideo: true,
      ingredients: [
        "Green curry paste",
        "Coconut milk",
        "Chicken",
        "Bell peppers",
        "Onions",
        "Fish sauce",
        "Sugar"
      ],
      steps: [
        "Cook chicken.",
        "Sauté onions and green curry paste.",
        "Add coconut milk and simmer.",
        "Add chicken and vegetables.",
        "Simmer until vegetables are tender."
      ],
      filters: ["Ill people", "Diet", "Nationality food"]
    },
    {
      id: 10,
      title: "Truffle Risotto",
      description: "Creamy Italian risotto with black truffle and parmesan cheese",
      image: "/recipe 4.jpg",
      time: "35 min",
      servings: 3,
      rating: 4.8,
      type: "premium",
      category: "Italian",
      hasVideo: true,
      ingredients: [
        "Risotto rice",
        "Chicken broth",
        "Black truffle",
        "Parmesan cheese",
        "Butter",
        "Onions",
        "Garlic"
      ],
      steps: [
        "Sauté onions and garlic.",
        "Add rice and broth, stirring constantly.",
        "Add black truffle and parmesan.",
        "Simmer until creamy."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 11,
      title: "Avocado Toast",
      description: "Simple yet delicious breakfast with smashed avocado and poached eggs",
      image: "/recipe 1.jpg",
      time: "10 min",
      servings: 2,
      rating: 4.5,
      type: "free",
      category: "Breakfast",
      hasVideo: false,
      ingredients: [
        "Avocado",
        "Eggs",
        "Bread",
        "Olive oil",
        "Salt",
        "Pepper"
      ],
      steps: [
        "Smashed avocado on toast.",
        "Poach eggs.",
        "Drizzle with olive oil, salt, and pepper."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 12,
      title: "Chocolate Soufflé",
      description: "Light and airy chocolate soufflé with a molten center",
      image: "/download (3).png",
      time: "40 min",
      servings: 4,
      rating: 4.9,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Egg whites",
        "Granulated sugar",
        "Dark chocolate",
        "Butter",
        "Flour"
      ],
      steps: [
        "Beat egg whites until stiff peaks.",
        "Add sugar gradually.",
        "Melt chocolate and butter.",
        "Fold into egg white mixture.",
        "Bake at 180°C (350°F) for 10-12 minutes."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 13,
      title: "Pad Thai",
      description: "Classic Thai stir-fried rice noodles with eggs, tofu, and peanuts",
      image: "/download (4).png",
      time: "25 min",
      servings: 3,
      rating: 4.6,
      type: "free",
      category: "Thai",
      hasVideo: true,
      ingredients: [
        "Rice noodles",
        "Chicken",
        "Tofu",
        "Peanuts",
        "Eggs",
        "Fish sauce",
        "Sugar",
        "Lime juice"
      ],
      steps: [
        "Cook rice noodles.",
        "Stir-fry chicken, tofu, and vegetables.",
        "Add noodles, eggs, and sauce.",
        "Serve with peanuts and lime."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 14,
      title: "Beef Bourguignon",
      description: "French beef stew braised in red wine with mushrooms and pearl onions",
      image: "/recipe 5.jpg",
      time: "3 hours",
      servings: 6,
      rating: 4.9,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Beef chuck",
        "Red wine",
        "Onions",
        "Carrots",
        "Mushrooms",
        "Pearl onions",
        "Garlic",
        "Bay leaves",
        "Thyme",
        "Salt",
        "Pepper"
      ],
      steps: [
        "Brown beef in a pan.",
        "Sauté onions, carrots, and garlic.",
        "Add mushrooms and pearl onions.",
        "Pour in red wine and broth.",
        "Simmer for 2-3 hours."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 15,
      title: "Greek Salad",
      description: "Fresh Mediterranean salad with feta, olives, and cucumber",
      image: "/download (5).png",
      time: "15 min",
      servings: 4,
      rating: 4.4,
      type: "free",
      category: "Greek",
      hasVideo: false,
      ingredients: [
        "Cucumber",
        "Tomatoes",
        "Red onion",
        "Feta cheese",
        "Olives",
        "Olive oil",
        "Lemon juice",
        "Salt",
        "Pepper"
      ],
      steps: [
        "Chop all vegetables.",
        "Mix with olive oil, lemon juice, salt, and pepper.",
        "Add feta and olives."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 16,
      title: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
      image: "/download (11).png",
      time: "4 hours",
      servings: 8,
      rating: 4.8,
      type: "premium",
      category: "Italian",
      hasVideo: true,
      ingredients: [
        "Ladyfingers",
        "Mascarpone cheese",
        "Egg yolks",
        "Sugar",
        "Coffee",
        "Cocoa powder"
      ],
      steps: [
        "Soak ladyfingers in coffee.",
        "Layer with mascarpone and coffee.",
        "Repeat layers.",
        "Sprinkle with cocoa powder."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 17,
      title: "Smoothie Bowl",
      description: "Colorful breakfast bowl with fresh fruits and granola",
      image: "/download (6).png",
      time: "10 min",
      servings: 1,
      rating: 4.3,
      type: "free",
      category: "Breakfast",
      hasVideo: false,
      ingredients: [
        "Banana",
        "Strawberries",
        "Blueberries",
        "Almond milk",
        "Granola"
      ],
      steps: [
        "Blend all fruits and almond milk.",
        "Pour into a bowl.",
        "Top with granola."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 18,
      title: "Crème Brûlée",
      description: "Classic French custard dessert with caramelized sugar top",
      image: "/recipe 6.jpg",
      time: "2 hours",
      servings: 6,
      rating: 4.8,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Egg yolks",
        "Sugar",
        "Heavy cream",
        "Vanilla extract"
      ],
      steps: [
        "Cook egg yolks and sugar until thick.",
        "Add cream and vanilla.",
        "Chill until set.",
        "Caramelize sugar on top."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 19,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy stir-fried vegetables with soy sauce",
      image: "/recipe 7.jpg",
      time: "20 min",
      servings: 3,
      rating: 4.2,
      type: "free",
      category: "Asian",
      hasVideo: false,
      ingredients: [
        "Broccoli",
        "Carrots",
        "Bell peppers",
        "Onions",
        "Soy sauce",
        "Garlic",
        "Ginger"
      ],
      steps: [
        "Sauté garlic and ginger.",
        "Add vegetables and soy sauce.",
        "Simmer until vegetables are tender."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 20,
      title: "Duck Confit",
      description: "Traditional French duck confit with crispy skin and tender meat",
      image: "/recipe 8.jpg",
      time: "4 hours",
      servings: 4,
      rating: 4.9,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Duck legs",
        "Salt",
        "Black pepper",
        "Garlic",
        "Thyme",
        "Bay leaves"
      ],
      steps: [
        "Dry duck legs with salt and pepper.",
        "Stuff with garlic, thyme, and bay leaves.",
        "Brine for 4 hours.",
        "Cook in a low-temperature oven."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 21,
      title: "Pancakes",
      description: "Fluffy American pancakes served with maple syrup and butter",
      image: "/recipe 9.jpg",
      time: "25 min",
      servings: 4,
      rating: 4.4,
      type: "free",
      category: "Breakfast",
      hasVideo: false,
      ingredients: [
        "Flour",
        "Eggs",
        "Milk",
        "Butter",
        "Sugar",
        "Baking powder"
      ],
      steps: [
        "Mix dry ingredients.",
        "Add wet ingredients.",
        "Scoop onto a hot pan.",
        "Cook until golden."
      ],
      filters: ["Vegetarian", "Diet"]
    },
    {
      id: 22,
      title: "Beef Tenderloin",
      description: "Perfectly cooked beef tenderloin with red wine reduction sauce",
      image: "/download (1).png",
      time: "1 hour",
      servings: 4,
      rating: 4.9,
      type: "premium",
      category: "American",
      hasVideo: true,
      ingredients: [
        "Beef tenderloin",
        "Red wine",
        "Garlic",
        "Onions",
        "Butter",
        "Thyme",
        "Salt",
        "Pepper"
      ],
      steps: [
        "Marinate beef in red wine, garlic, and spices.",
        "Cook in a hot oven.",
        "Reduce red wine sauce."
      ],
      filters: ["Diet", "Nationality food"]
    },
    {
      id: 23,
      title: "Caesar Salad",
      description: "Classic Caesar salad with romaine lettuce and parmesan cheese",
      image: "/download (11).png",
      time: "15 min",
      servings: 2,
      rating: 4.3,
      type: "free",
      category: "American",
      hasVideo: false,
      ingredients: [
        "Romaine lettuce",
        "Croutons",
        "Parmesan cheese",
        "Caesar dressing"
      ],
      steps: [
        "Toss romaine lettuce with croutons.",
        "Drizzle with Caesar dressing.",
        "Top with parmesan."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    },
    {
      id: 24,
      title: "Chocolate Mousse",
      description: "Light and airy chocolate mousse with whipped cream",
      image: "/download (6).png",
      time: "2 hours",
      servings: 6,
      rating: 4.7,
      type: "premium",
      category: "French",
      hasVideo: true,
      ingredients: [
        "Egg yolks",
        "Sugar",
        "Dark chocolate",
        "Heavy cream",
        "Vanilla extract"
      ],
      steps: [
        "Cook egg yolks and sugar until thick.",
        "Add cream and vanilla.",
        "Chill until set."
      ],
      filters: ["Vegetarian", "Diet", "Nationality food"]
    }
  ];

  const allFilters = [
    "Vegetarian",
    "Lactose Intolerant",
    "Pregnant mothers",
    "Ill people",
    "Diet",
    "Nationality food"
  ];

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === 'all') return true;
    if (filter === 'free' || filter === 'premium') return recipe.type === filter;
    if (moreFilter) return recipe.filters && recipe.filters.includes(moreFilter);
    return true;
  });

  // Show only first 6 recipes on main page
  const displayedRecipes = filteredRecipes.slice(0, 6);
  const hasMoreRecipes = filteredRecipes.length > 6;

  const RecipeCard = ({ recipe }: { recipe: any }) => (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 group cursor-pointer"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-102 transition-transform duration-200"
        />
        {recipe.type === 'premium' && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Lock className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}
        {recipe.hasVideo && (
          <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
            <Play className="h-4 w-4" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
          {recipe.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-500 fill-current" />
            <span>{recipe.rating}</span>
          </div>
        </div>
        
        <button
          className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg hover:bg-amber-600 transition-colors duration-200 font-semibold group text-sm sm:text-base"
          onClick={e => { e.stopPropagation(); setSelectedRecipe(recipe); }}
        >
          <span>
            {recipe.type === 'premium' ? 'Subscribe to Access' : 'View Recipe'}
          </span>
        </button>
      </div>
    </div>
  );

  // Add the course as a special item (not a recipe)
  const course = {
    id: 'course-1',
    title: "Ultimate Culinary Mastery Course",
    description: "Unlock your culinary potential with our exclusive course! Includes official merch, 1-on-1 sessions with world-class chefs like Gordon Ramsay, and a treasure trove of premium benefits.",
    image: "/download (2).png",
    price: 999,
    benefits: [
      "Official Culinary Mastery Merch Pack",
      "1-on-1 virtual and in-person sessions with world-class chefs (e.g., Gordon Ramsay)",
      "Lifetime access to all premium recipes and tutorials",
      "Exclusive members-only events and Q&A",
      "Personalized feedback on your cooking",
      "Certificate of Culinary Mastery",
      "VIP support and community access",
      "Tonnes of additional exclusive perks"
    ]
  };

  const filterImages: Record<string, string> = {
    "Vegetarian": "/recipe 1.jpg",
    "Lactose Intolerant": "/recipe 2.jpg",
    "Pregnant mothers": "/recipe 3.jpg", // Pregnant woman eating healthy
    "Ill people": "/recipe 4.jpg",
    "Diet": "/recipe 5.jpg", // Healthy salad bowl
    "Nationality food": "/recipe 6.jpg"
  };

  return (
    <>
      <section id="recipes" className="py-20 bg-gray-50 scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recipe Library
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From quick weeknight dinners to elaborate weekend projects, discover recipes that inspire and delight.
            </p>
          </div>
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => { setFilter('all'); setMoreFilter(''); }}
                className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base ${
                  filter === 'all' && !moreFilter
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                All Recipes
              </button>
              <button
                onClick={() => { setFilter('free'); setMoreFilter(''); }}
                className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base ${
                  filter === 'free' && !moreFilter
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => { setFilter('premium'); setMoreFilter(''); }}
                className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base ${
                  filter === 'premium' && !moreFilter
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                Premium
              </button>
            </div>
          </div>
          
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* More Button and Filter Button */}
          {hasMoreRecipes && (
            <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowAllRecipes(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
              >
                View All {filteredRecipes.length} Recipes
              </button>
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-amber-400 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:from-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95 border-4 border-white animate-pulse"
                style={{ boxShadow: '0 4px 24px 0 rgba(255, 193, 7, 0.25)' }}
              >
                <FilterIcon className="w-6 h-6" />
                Filter
              </button>
            </div>
          )}
        </div>
      </section>
      {/* Course Marketing Section */}
      <section id="culinary-course" className="relative py-24 bg-gradient-to-br from-yellow-50 via-amber-100 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/recipe 2.jpg" alt="Culinary Mastery" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 mb-6 drop-shadow-lg">
              Become a Culinary Legend
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 mb-6 max-w-2xl font-medium">
              Introducing the <span className="text-orange-600 font-bold">Ultimate Culinary Mastery Course</span> — your all-access pass to the world of elite cooking. <br />
              <span className="text-amber-700 font-bold">$999</span> for a lifetime of skills, connections, and exclusive perks.
            </p>
            <ul className="mb-8 text-lg text-gray-700 space-y-2 max-w-xl">
              <li>🍳 <span className="font-semibold">1-on-1 sessions</span> with world-class chefs like <span className="text-orange-700 font-bold">Gordon Ramsay</span></li>
              <li>🎁 <span className="font-semibold">Official Culinary Mastery Merch Pack</span></li>
              <li>🏆 <span className="font-semibold">Lifetime access</span> to all premium recipes & tutorials</li>
              <li>🎉 <span className="font-semibold">VIP invites</span> to members-only events & Q&A</li>
              <li>📜 <span className="font-semibold">Certificate of Culinary Mastery</span></li>
              <li>💬 <span className="font-semibold">Personalized feedback</span> on your cooking</li>
              <li>✨ ...and so much more!</li>
            </ul>
            <button
              className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-10 py-5 rounded-2xl font-extrabold text-2xl shadow-2xl hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-amber-400/40 active:scale-95 mt-2"
              onClick={() => setShowCourseModal(true)}
            >
              Unlock My Culinary Journey — $999
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-white">
              <img src="/download (2).png" alt="Culinary Course" className="w-full h-80 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-700/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Ultimate Culinary Mastery Course</h3>
                <p className="text-lg text-white/90">"Transform your kitchen, your skills, and your life. This is your moment."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* All Recipes Modal */}
      {showAllRecipes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                All {filteredRecipes.length} Recipes
              </h3>
              <button
                onClick={() => setShowAllRecipes(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedRecipe.title}
              </h3>
              <button
                onClick={() => { setSelectedRecipe(null); setShowRecipeDetails(false); }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-56 object-cover rounded-xl mb-6"
              />
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {selectedRecipe.time}</div>
                <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {selectedRecipe.servings} servings</div>
                <div className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-500 fill-current" /> {selectedRecipe.rating}</div>
                <div className="flex items-center gap-1"><span className="font-semibold">Category:</span> {selectedRecipe.category}</div>
                {selectedRecipe.type === 'premium' && (
                  <div className="flex items-center gap-1"><Lock className="h-4 w-4" /> Premium</div>
                )}
                {selectedRecipe.hasVideo && (
                  <div className="flex items-center gap-1"><Play className="h-4 w-4" /> Video Included</div>
                )}
              </div>
              <p className="text-base text-gray-800 mb-4">{selectedRecipe.description}</p>
              {/* Show button to reveal ingredients/steps or subscribe if premium */}
              {selectedRecipe.type === 'premium' ? (
                <button
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 mb-2"
                  onClick={() => { setShowSubscriptionModal(true); }}
                >
                  Subscribe to view full recipe
                </button>
              ) : (
                <button
                  className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 mb-2"
                  onClick={() => setShowRecipeDetails((prev) => !prev)}
                >
                  {showRecipeDetails ? 'Hide Ingredients & Steps' : 'Show Ingredients & Steps'}
                </button>
              )}
              {/* Ingredients and Steps */}
              {showRecipeDetails && selectedRecipe.type !== 'premium' && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-2">Ingredients</h4>
                  <ul className="list-disc list-inside mb-4 text-gray-700">
                    {selectedRecipe.ingredients?.map((ing: string, idx: number) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                  <h4 className="text-lg font-bold mb-2">Steps</h4>
                  <ol className="list-decimal list-inside text-gray-700">
                    {selectedRecipe.steps?.map((step: string, idx: number) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          {/* Subscription Modal for premium recipes */}
          {showSubscriptionModal && (
            <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
          )}
        </div>
      )}

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-700 via-orange-500 to-yellow-400 relative">
              <img src={course.image} alt={course.title} className="w-64 h-64 object-cover rounded-2xl shadow-xl border-4 border-amber-400 mb-6 z-10 relative" style={{ boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.25)' }} />
              <div className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" style={{ background: 'url(/recipe 4.jpg) center/cover no-repeat' }}></div>
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <button
                onClick={() => setShowCourseModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
              <h2 className="text-3xl font-extrabold text-amber-700 mb-2">{course.title}</h2>
              <div className="text-2xl font-bold text-amber-600 mb-4">${course.price}</div>
              <p className="mb-4 text-lg text-gray-800">{course.description}</p>
              <ul className="list-disc list-inside mb-6 text-gray-700">
                {course.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <button
                className="w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                onClick={() => {
                  if (!user) {
                    setShowAuthModal(true);
                  } else {
                    setShowCoursePayment(true);
                  }
                }}
              >
                Purchase Now for $999
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Auth Modal for sign in */}
      {showAuthModal && (
        <AuthModal mode="signin" onClose={() => setShowAuthModal(false)} />
      )}
      {/* Course Payment Modal */}
      {showCoursePayment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-8 flex flex-col items-center">
            <button
              onClick={() => setShowCoursePayment(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-amber-700 mb-4">Course Payment</h2>
            <p className="mb-4 text-gray-700 text-center">Complete your payment of <span className="font-bold text-amber-600">$999</span> to unlock the Ultimate Culinary Mastery Course. (Payment integration goes here.)</p>
            <input type="text" placeholder="Card Number" className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
            <input type="text" placeholder="Expiry Date (MM/YY)" className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
            <input type="text" placeholder="CVV" className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
            <input type="text" placeholder="Cardholder Name" className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
            <button className="w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-3 rounded-xl font-bold text-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 mb-2">
              Pay $999
            </button>
            <p className="text-xs text-gray-500 mt-2">Your payment will be processed securely. You will receive a confirmation email once the course is unlocked.</p>
          </div>
        </div>
      )}
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-white via-amber-50 to-orange-100 rounded-3xl shadow-2xl max-w-md w-full p-6 relative border-4 border-amber-300">
            <button
              onClick={() => setShowFilterModal(false)}
              className="absolute top-3 right-3 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full p-2 shadow-md transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-extrabold text-amber-700 mb-6 text-center drop-shadow">Filter Recipes</h2>
            <div className="grid grid-cols-1 gap-4">
              {allFilters.map(f => (
                <button
                  key={f}
                  onClick={() => { setMoreFilter(f); setFilter(''); setShowFilterModal(false); setShowFilteredRecipes(true); }}
                  className={`flex items-center gap-4 p-3 rounded-xl shadow border-2 border-amber-100 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 group ${moreFilter === f ? 'bg-amber-200 border-amber-500 scale-105' : 'bg-white'}`}
                >
                  <img
                    src={filterImages[f]}
                    alt={f}
                    className="w-12 h-12 object-cover rounded-full border-2 border-amber-200 group-hover:border-amber-400 shadow"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-base font-bold text-amber-700 group-hover:text-orange-600">{f}</span>
                    <span className="text-xs text-gray-600">{f === 'Nationality food' ? 'Explore world cuisines' : `See ${f} recipes`}</span>
                  </div>
                </button>
              ))}
            </div>
            {moreFilter && (
              <div className="mt-6 text-center">
                <span className="inline-block px-3 py-1 bg-amber-200 rounded-full text-amber-800 font-bold text-sm shadow">{moreFilter}</span>
                <button onClick={() => setMoreFilter('')} className="ml-2 text-amber-600 text-base align-middle">&times;</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filtered Recipes Modal */}
      {showFilteredRecipes && moreFilter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {moreFilter} Recipes ({filteredRecipes.length})
              </h3>
              <button
                onClick={() => { setShowFilteredRecipes(false); setMoreFilter(''); }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h4>
                  <p className="text-gray-500">No recipes match the "{moreFilter}" filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeLibrary;