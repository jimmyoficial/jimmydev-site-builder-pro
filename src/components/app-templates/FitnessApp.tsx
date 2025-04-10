
import React, { useState, useEffect } from 'react';
import { AppSimulatorConfig } from '@/utils/simulatorUtils';
import { 
  Home, BarChart, Calendar, Settings, User,
  Play, Pause, ChevronLeft, Award, Clock,
  Heart, ChevronRight, ArrowRight, Bell, 
  Zap, Check, X, Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/simulatorUtils';

interface FitnessAppProps {
  config: AppSimulatorConfig;
  onInteraction: (action: string) => void;
}

export const FitnessApp: React.FC<FitnessAppProps> = ({ 
  config, 
  onInteraction 
}) => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'workout' | 'stats' | 'profile'>('home');
  const [activeWorkout, setActiveWorkout] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectionError, setShowConnectionError] = useState(false);
  
  // Mock data
  const workouts = [
    { 
      id: 1, 
      name: 'Treino Executivo Matinal', 
      duration: '20 min', 
      level: 'Iniciante',
      calories: 120,
      exercises: [
        { id: 1, name: 'Mobilidade de pescoço', duration: '00:45', sets: 2, image: config.customImages['exercise1'] || null },
        { id: 2, name: 'Alongamento de ombros', duration: '00:45', sets: 2, image: config.customImages['exercise2'] || null },
        { id: 3, name: 'Alongamento de punhos', duration: '00:45', sets: 2, image: config.customImages['exercise3'] || null },
        { id: 4, name: 'Agachamento em pé', duration: '00:45', sets: 3, image: config.customImages['exercise4'] || null },
      ],
      image: config.customImages['workout1'] || null
    },
    { 
      id: 2, 
      name: 'Pausa Ativa Corporativa', 
      duration: '15 min', 
      level: 'Todos os níveis',
      calories: 85,
      exercises: [
        { id: 5, name: 'Rotação de tronco', duration: '00:30', sets: 2, image: config.customImages['exercise5'] || null },
        { id: 6, name: 'Alongamento lateral', duration: '00:45', sets: 2, image: config.customImages['exercise6'] || null },
        { id: 7, name: 'Elevação de pernas', duration: '00:30', sets: 3, image: config.customImages['exercise7'] || null },
      ],
      image: config.customImages['workout2'] || null
    },
    { 
      id: 3, 
      name: 'Cardio Pós-Expediente', 
      duration: '25 min', 
      level: 'Intermediário',
      calories: 180,
      exercises: [
        { id: 8, name: 'Jumping jacks', duration: '01:00', sets: 3, image: config.customImages['exercise8'] || null },
        { id: 9, name: 'Corrida estacionária', duration: '01:30', sets: 2, image: config.customImages['exercise9'] || null },
        { id: 10, name: 'Mountain climbers', duration: '00:45', sets: 3, image: config.customImages['exercise10'] || null },
        { id: 11, name: 'Burpees', duration: '00:30', sets: 3, image: config.customImages['exercise11'] || null },
      ],
      image: config.customImages['workout3'] || null
    }
  ];

  const weekStats = [
    { day: 'Seg', minutes: 25, completed: true },
    { day: 'Ter', minutes: 18, completed: true },
    { day: 'Qua', minutes: 0, completed: false },
    { day: 'Qui', minutes: 20, completed: true },
    { day: 'Sex', minutes: 0, completed: false },
    { day: 'Sáb', minutes: 15, completed: true },
    { day: 'Dom', minutes: 0, completed: false }
  ];

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => {
          if (seconds >= 59) {
            setTimerMinutes(minutes => minutes + 1);
            return 0;
          }
          return seconds + 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const getWorkoutById = (id: number) => {
    return workouts.find(workout => workout.id === id);
  };

  // Handlers
  const handleStartWorkout = (workoutId: number) => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate random connection error (10% chance)
      if (Math.random() < 0.1) {
        setShowConnectionError(true);
        setTimeout(() => setShowConnectionError(false), 3000);
        return;
      }
      
      setActiveWorkout(workoutId);
      setActiveScreen('workout');
      setTimerSeconds(0);
      setTimerMinutes(0);
      setCompletedExercises([]);
      trackEvent('start_workout', { workoutId });
      onInteraction('start_workout');
    }, 800);
  };

  const handleToggleTimer = () => {
    setTimerActive(!timerActive);
    trackEvent(timerActive ? 'pause_workout' : 'resume_workout', {});
    onInteraction(timerActive ? 'pause_workout' : 'resume_workout');
  };

  const handleCompleteExercise = (exerciseId: number) => {
    if (completedExercises.includes(exerciseId)) {
      setCompletedExercises(completedExercises.filter(id => id !== exerciseId));
    } else {
      setCompletedExercises([...completedExercises, exerciseId]);
      toast.success('Exercício concluído!');
    }
    
    trackEvent('toggle_exercise_completion', { exerciseId });
    onInteraction('toggle_exercise_completion');
  };

  const handleFinishWorkout = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setActiveScreen('home');
      setActiveWorkout(null);
      setTimerActive(false);
      
      const totalTime = timerMinutes + (timerSeconds / 60);
      
      toast.success(`Treino concluído em ${timerMinutes}m ${timerSeconds}s!`);
      trackEvent('finish_workout', { 
        workoutId: activeWorkout,
        duration: totalTime,
        completedExercises: completedExercises.length 
      });
      onInteraction('finish_workout');
    }, 1000);
  };

  // Component renders
  const renderHomeScreen = () => (
    <div className="p-5 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold mb-1">Olá, Líder!</h1>
          <p className="text-sm text-gray-500">Bem-vindo ao {config.appName}</p>
        </div>
        <button 
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${config.primaryColor}15` }}
          onClick={() => {
            toast.success('Notificações');
            onInteraction('view_notifications');
          }}
        >
          <Bell size={20} style={{ color: config.primaryColor }} />
        </button>
      </div>
      
      <div 
        className="rounded-2xl overflow-hidden mb-6 shadow-md"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="p-5 text-white">
          <h3 className="text-lg font-semibold mb-1">Resumo da semana</h3>
          <p className="text-sm text-white/80 mb-4">Seu progresso está acima da média!</p>
          
          <div className="flex items-end mb-2 space-x-2">
            {weekStats.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full rounded-md transition-all duration-500"
                  style={{ 
                    height: `${day.minutes * 2}px`, 
                    backgroundColor: day.completed ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    minHeight: '10px'
                  }}
                ></div>
                <span className="text-xs mt-2">{day.day}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">4 dias</div>
              <div className="text-sm text-white/80">esta semana</div>
            </div>
            <div>
              <div className="text-2xl font-bold">78 min</div>
              <div className="text-sm text-white/80">tempo total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">385</div>
              <div className="text-sm text-white/80">kcal</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Treinos corporativos</h2>
          <button 
            className="text-sm font-medium"
            style={{ color: config.primaryColor }}
            onClick={() => {
              toast.success('Ver todos os treinos');
              onInteraction('view_all_workouts');
            }}
          >
            Ver todos
          </button>
        </div>
        
        <div className="space-y-4">
          {workouts.map(workout => (
            <div 
              key={workout.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex"
              onClick={() => handleStartWorkout(workout.id)}
            >
              <div 
                className="w-24 h-24 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                {workout.image ? (
                  <img 
                    src={workout.image} 
                    alt={workout.name} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div 
                    className="h-12 w-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.primaryColor}30` }}
                  >
                    <Zap size={24} style={{ color: config.primaryColor }} />
                  </div>
                )}
              </div>
              
              <div className="p-3 flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{workout.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-xs text-gray-500 mr-3">
                    <Clock size={12} className="mr-1" />
                    {workout.duration}
                  </div>
                  <div className="text-xs py-0.5 px-2 rounded-full bg-gray-100 text-gray-600">
                    {workout.level}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">{workout.exercises.length} exercícios</div>
                  <button 
                    className="flex items-center text-sm rounded-lg py-1 px-3 font-medium"
                    style={{ 
                      backgroundColor: `${config.primaryColor}15`,
                      color: config.primaryColor 
                    }}
                  >
                    Iniciar
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Metas corporativas</h2>
          <button 
            className="text-sm font-medium"
            style={{ color: config.primaryColor }}
            onClick={() => {
              toast.success('Definir metas');
              onInteraction('set_goals');
            }}
          >
            Definir metas
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div 
                className="h-10 w-10 rounded-full mr-3 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <Award size={20} style={{ color: config.primaryColor }} />
              </div>
              <div>
                <h3 className="font-medium">Atividade semanal</h3>
                <p className="text-xs text-gray-500">4 de 5 dias concluídos</p>
              </div>
            </div>
            <div className="text-sm font-semibold" style={{ color: config.primaryColor }}>80%</div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div 
              className="h-2.5 rounded-full" 
              style={{ width: '80%', backgroundColor: config.primaryColor }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div 
                className="h-10 w-10 rounded-full mr-3 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <Zap size={20} style={{ color: config.primaryColor }} />
              </div>
              <div>
                <h3 className="font-medium">Calorias</h3>
                <p className="text-xs text-gray-500">385 de 500 kcal</p>
              </div>
            </div>
            <div className="text-sm font-semibold" style={{ color: config.primaryColor }}>77%</div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4">
            <div 
              className="h-2.5 rounded-full" 
              style={{ width: '77%', backgroundColor: config.primaryColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkoutScreen = () => {
    const workout = activeWorkout ? getWorkoutById(activeWorkout) : null;
    
    if (!workout) return null;
    
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
          <button 
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${config.primaryColor}15` }}
            onClick={() => {
              setActiveScreen('home');
              setActiveWorkout(null);
              setTimerActive(false);
              onInteraction('exit_workout');
            }}
          >
            <ChevronLeft size={22} style={{ color: config.primaryColor }} />
          </button>
          <h1 className="text-lg font-bold">{workout.name}</h1>
          <div className="h-10 w-10"></div> {/* Spacer for centering */}
        </div>
        
        <div className="flex items-center justify-center bg-gray-50 p-5 border-b border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </div>
            <button 
              className="h-14 w-14 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: config.primaryColor }}
              onClick={handleToggleTimer}
            >
              {timerActive ? (
                <Pause size={28} className="text-white" />
              ) : (
                <Play size={28} className="text-white ml-1" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-5">
            <h2 className="text-lg font-bold mb-3">Exercícios</h2>
            
            <div className="space-y-3">
              {workout.exercises.map((exercise, index) => (
                <div 
                  key={exercise.id} 
                  className={`bg-white rounded-xl p-3 border shadow-sm flex items-center ${
                    completedExercises.includes(exercise.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="relative mr-3">
                    <div 
                      className={`h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden ${
                        completedExercises.includes(exercise.id) ? 'opacity-60' : ''
                      }`}
                      style={{ backgroundColor: `${config.primaryColor}15` }}
                    >
                      {exercise.image ? (
                        <img 
                          src={exercise.image} 
                          alt={exercise.name} 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <div className="text-lg">
                          {index % 4 === 0 ? '🧘‍♂️' : index % 4 === 1 ? '💪' : index % 4 === 2 ? '🏃‍♂️' : '🤸‍♂️'}
                        </div>
                      )}
                    </div>
                    {completedExercises.includes(exercise.id) && (
                      <div 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center bg-green-500 text-white border-2 border-white"
                      >
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${completedExercises.includes(exercise.id) ? 'line-through text-green-600' : ''}`}>
                      {exercise.name}
                    </h3>
                    <div className="flex text-xs text-gray-500">
                      <span className="mr-3">{exercise.duration}</span>
                      <span>{exercise.sets} séries</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completedExercises.includes(exercise.id) 
                        ? 'bg-green-500 text-white' 
                        : 'border border-gray-300'
                    }`}
                    onClick={() => handleCompleteExercise(exercise.id)}
                  >
                    {completedExercises.includes(exercise.id) ? (
                      <Check size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md flex items-center justify-center"
            style={{ backgroundColor: config.primaryColor }}
            onClick={handleFinishWorkout}
          >
            {completedExercises.length === workout.exercises.length ? 'Concluir treino' : 'Finalizar treino'}
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Error and loading components
  const ConnectionError = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-5/6 rounded-2xl p-5 shadow-lg">
        <div className="flex justify-center mb-4">
          <div 
            className="h-16 w-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.primaryColor}15` }}
          >
            <X size={32} style={{ color: config.primaryColor }} />
          </div>
        </div>
        <h3 className="text-center font-bold text-lg mb-2">Erro de conexão</h3>
        <p className="text-center text-gray-600 text-sm mb-4">
          Não foi possível conectar ao servidor. Por favor, verifique sua conexão e tente novamente.
        </p>
        <button 
          className="w-full py-3 rounded-xl text-white font-medium shadow-md"
          style={{ backgroundColor: config.primaryColor }}
          onClick={() => setShowConnectionError(false)}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );

  const LoadingOverlay = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-[1px]">
      <div 
        className="h-14 w-14 rounded-full flex items-center justify-center relative"
        style={{ backgroundColor: `${config.primaryColor}40` }}
      >
        <div 
          className="h-10 w-10 rounded-full animate-spin"
          style={{ 
            borderWidth: '3px',
            borderColor: `${config.primaryColor}20`,
            borderTopColor: config.primaryColor
          }}
        ></div>
      </div>
    </div>
  );

  // Bottom nav component
  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around">
        <NavItem 
          icon={<Home size={24} />} 
          label="Início" 
          active={activeScreen === 'home'} 
          color={config.primaryColor}
          onClick={() => {
            setActiveScreen('home');
            onInteraction('nav_to_home');
          }}
        />
        <NavItem 
          icon={<BarChart size={24} />} 
          label="Estatísticas" 
          active={activeScreen === 'stats'} 
          color={config.primaryColor}
          onClick={() => {
            setActiveScreen('stats');
            onInteraction('nav_to_stats');
          }}
        />
        <NavItem 
          icon={<Calendar size={24} />} 
          label="Planos" 
          active={false} 
          color={config.primaryColor}
          onClick={() => {
            toast.success('Planos de treino');
            onInteraction('nav_to_plans');
          }}
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Perfil" 
          active={activeScreen === 'profile'} 
          color={config.primaryColor}
          onClick={() => {
            setActiveScreen('profile');
            onInteraction('nav_to_profile');
          }}
        />
      </div>
    </div>
  );

  // Navigation item component
  const NavItem = ({ 
    icon, 
    label, 
    active = false, 
    color = '#9CA3AF',
    onClick
  }: { 
    icon: React.ReactNode;
    label: string; 
    active?: boolean;
    color?: string;
    onClick?: () => void;
  }) => (
    <button 
      className="flex flex-col items-center"
      onClick={onClick}
    >
      <div style={{ color: active ? color : '#9CA3AF' }}>
        {icon}
      </div>
      <span 
        className="text-xs mt-1" 
        style={{ color: active ? color : '#9CA3AF' }}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      {showConnectionError && <ConnectionError />}
      {isLoading && <LoadingOverlay />}
      
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'home' && renderHomeScreen()}
        {activeScreen === 'workout' && renderWorkoutScreen()}
      </div>
      
      {activeScreen !== 'workout' && <BottomNav />}
    </div>
  );
};

