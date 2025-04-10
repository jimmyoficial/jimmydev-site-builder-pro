
import React, { useState, useEffect } from 'react';
import { AppSimulatorConfig } from '@/utils/simulatorUtils';
import { 
  Home, Search, User, Heart, 
  MessageSquare, PlusCircle, Share2, 
  MapPin, Bookmark, MoreHorizontal,
  ChevronLeft, Settings, Bell
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/simulatorUtils';

interface SocialAppProps {
  config: AppSimulatorConfig;
  onInteraction: (action: string) => void;
}

export const SocialApp: React.FC<SocialAppProps> = ({ 
  config, 
  onInteraction 
}) => {
  const [activeScreen, setActiveScreen] = useState<'feed' | 'profile' | 'post' | 'comments'>('feed');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectionError, setShowConnectionError] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  // Data
  const users = [
    { id: 1, name: 'Carolina Silva', avatar: config.customImages['user1'] || null, role: 'Marketing', company: 'JimmyDev' },
    { id: 2, name: 'Ricardo Torres', avatar: config.customImages['user2'] || null, role: 'Desenvolvedor', company: 'JimmyDev' },
    { id: 3, name: 'Amanda Rocha', avatar: config.customImages['user3'] || null, role: 'Design', company: 'JimmyDev' },
    { id: 4, name: 'Bruno Mendes', avatar: config.customImages['user4'] || null, role: 'Produto', company: 'JimmyDev' },
  ];
  
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      userId: 1, 
      content: 'Nossa nova campanha corporativa está alcançando resultados impressionantes! #marketing #resultados', 
      image: config.customImages['post1'] || null,
      location: 'Sede JimmyDev',
      likes: 24,
      comments: [
        { id: 1, userId: 2, text: 'Excelente trabalho! Os números estão realmente impressionantes.', time: '1h' },
        { id: 2, userId: 3, text: 'A identidade visual ficou incrível!', time: '45m' },
      ],
      time: '2h',
      liked: false,
      bookmarked: false
    },
    { 
      id: 2, 
      userId: 4, 
      content: 'Finalizando a apresentação para o lançamento do novo produto. Estamos ansiosos para compartilhar com vocês! 🚀 #inovação #tecnologia', 
      image: config.customImages['post2'] || null,
      location: 'Lab de Inovação',
      likes: 18,
      comments: [
        { id: 3, userId: 1, text: 'Mal posso esperar para ver! 👏', time: '30m' },
      ],
      time: '4h',
      liked: false,
      bookmarked: false
    },
    { 
      id: 3, 
      userId: 2, 
      content: 'Implementando novas tecnologias para melhorar nossa infraestrutura. O futuro é agora! 💻 #tecnologia #desenvolvimento', 
      image: config.customImages['post3'] || null,
      location: 'Tech Hub',
      likes: 32,
      comments: [],
      time: '1d',
      liked: false,
      bookmarked: false
    }
  ]);

  const stories = [
    { id: 0, userId: 0, viewed: false, own: true },
    { id: 1, userId: 1, viewed: false },
    { id: 2, userId: 3, viewed: false },
    { id: 3, userId: 4, viewed: false },
    { id: 4, userId: 2, viewed: true }
  ];

  // Handlers
  const handleLike = (postId: number) => {
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
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const alreadyLiked = post.liked;
          return {
            ...post,
            likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
            liked: !alreadyLiked
          };
        }
        return post;
      }));
      
      trackEvent('like_post', { postId });
      onInteraction('like_post');
    }, 300);
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          bookmarked: !post.bookmarked
        };
      }
      return post;
    }));
    
    toast.success('Post salvo para ver mais tarde');
    trackEvent('bookmark_post', { postId });
    onInteraction('bookmark_post');
  };

  const handleShare = (postId: number) => {
    toast.success('Link copiado para a área de transferência');
    trackEvent('share_post', { postId });
    onInteraction('share_post');
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;
    
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { 
                id: Math.max(...post.comments.map(c => c.id), 0) + 1, 
                userId: 0, // current user
                text: newComment.trim(),
                time: 'agora' 
              }
            ]
          };
        }
        return post;
      }));
      
      setNewComment('');
      trackEvent('add_comment', { postId });
      onInteraction('add_comment');
      toast.success('Comentário adicionado');
    }, 500);
  };

  const handleViewStory = (storyId: number) => {
    toast.success('Visualizando história');
    trackEvent('view_story', { storyId });
    onInteraction('view_story');
  };

  const handleViewPost = (postId: number) => {
    setSelectedPost(postId);
    setActiveScreen('post');
    trackEvent('view_post_detail', { postId });
    onInteraction('view_post_detail');
  };

  const handleViewComments = (postId: number) => {
    setSelectedPost(postId);
    setActiveScreen('comments');
    trackEvent('view_comments', { postId });
    onInteraction('view_comments');
  };

  const handleViewProfile = (userId: number) => {
    toast.success('Visualizando perfil');
    trackEvent('view_profile', { userId });
    onInteraction('view_profile');
  };

  const getPostById = (postId: number) => {
    return posts.find(post => post.id === postId);
  };

  const getUserById = (userId: number) => {
    if (userId === 0) return { id: 0, name: 'Você', avatar: config.logo, role: 'Usuário', company: 'JimmyDev' };
    return users.find(user => user.id === userId) || users[0];
  };

  // Render components
  const renderFeed = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="py-3 px-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
        {config.logo ? (
          <img src={config.logo} alt={config.appName} className="h-8 object-contain" />
        ) : (
          <h1 className="text-xl font-bold" style={{ color: config.primaryColor }}>
            {config.appName}
          </h1>
        )}
        
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => {
              toast.success('Notificações');
              onInteraction('view_notifications');
            }}
          >
            <Bell size={22} className="text-gray-700" />
          </button>
          <button
            onClick={() => {
              toast.success('Mensagens');
              onInteraction('view_messages');
            }}
          >
            <MessageSquare size={22} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-3 bg-white border-b border-gray-200">
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-1 px-1">
          {stories.map((story) => (
            <div 
              key={story.id}
              className="flex flex-col items-center"
              onClick={() => handleViewStory(story.id)}
            >
              <div 
                className={`h-16 w-16 rounded-full p-[2px] mb-1 ${
                  story.viewed 
                    ? 'bg-gray-300' 
                    : ''
                }`}
                style={
                  !story.viewed 
                    ? { backgroundImage: `linear-gradient(to bottom right, ${config.primaryColor}, ${config.secondaryColor})` } 
                    : {}
                }
              >
                <div 
                  className="h-full w-full rounded-full flex items-center justify-center overflow-hidden border-2 border-white"
                  style={{ backgroundColor: story.own ? `${config.primaryColor}20` : 'white' }}
                >
                  {story.own ? (
                    <div className="relative">
                      {config.logo ? (
                        <img 
                          src={config.logo} 
                          alt="Sua foto" 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <User size={24} style={{ color: config.primaryColor }} />
                      )}
                      <div 
                        className="absolute bottom-0 right-0 h-5 w-5 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: config.primaryColor }}
                      >
                        <PlusCircle size={12} />
                      </div>
                    </div>
                  ) : (
                    getUserById(story.userId).avatar ? (
                      <img 
                        src={getUserById(story.userId).avatar || ''} 
                        alt={getUserById(story.userId).name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <User size={24} className="text-gray-500" />
                    )
                  )}
                </div>
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {story.own ? 'Seu story' : getUserById(story.userId).name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-200 bg-white mb-3">
            <div className="p-3 flex items-center justify-between">
              <div 
                className="flex items-center"
                onClick={() => handleViewProfile(post.userId)}
              >
                <div 
                  className="h-10 w-10 rounded-full mr-3 flex items-center justify-center overflow-hidden border border-gray-200"
                  style={{ backgroundColor: `${config.primaryColor}10` }}
                >
                  {getUserById(post.userId).avatar ? (
                    <img 
                      src={getUserById(post.userId).avatar || ''} 
                      alt={getUserById(post.userId).name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <User size={22} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{getUserById(post.userId).name}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{getUserById(post.userId).role}</span>
                    {post.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="flex items-center">
                          <MapPin size={10} className="mr-0.5" /> 
                          {post.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  toast.success('Opções do post');
                  onInteraction('post_options');
                }}
              >
                <MoreHorizontal size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div 
              className="aspect-square flex items-center justify-center relative"
              onClick={() => handleViewPost(post.id)}
            >
              {post.image ? (
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div 
                  className="h-full w-full flex items-center justify-center bg-gray-50"
                  style={{ backgroundColor: `${config.primaryColor}10` }}
                >
                  <div className="relative h-full w-full flex items-center justify-center">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                      {Array.from({length: 36}).map((_, i) => (
                        <div key={i} className="border border-black/5"></div>
                      ))}
                    </div>
                    
                    <div 
                      className="w-4/5 p-6 rounded-xl text-center shadow-md"
                      style={{ backgroundColor: `${config.primaryColor}20` }}
                    >
                      <p className="text-base" style={{ color: config.primaryColor }}>
                        {post.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4">
                  <button 
                    className={`text-gray-700 ${post.liked ? 'text-red-500' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart 
                      size={24} 
                      fill={post.liked ? 'currentColor' : 'none'} 
                    />
                  </button>
                  <button 
                    className="text-gray-700"
                    onClick={() => handleViewComments(post.id)}
                  >
                    <MessageSquare size={24} />
                  </button>
                  <button 
                    className="text-gray-700"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 size={24} />
                  </button>
                </div>
                <button 
                  className={`text-gray-700 ${post.bookmarked ? 'text-black' : ''}`}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark 
                    size={24} 
                    fill={post.bookmarked ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>
              
              <div className="text-sm font-semibold mb-1">{post.likes} curtidas</div>
              
              <div className="text-sm">
                <span className="font-semibold mr-1">{getUserById(post.userId).name.split(' ')[0]}</span>
                {post.content}
              </div>
              
              {post.comments.length > 0 && (
                <button 
                  className="text-sm text-gray-500 mt-1"
                  onClick={() => handleViewComments(post.id)}
                >
                  Ver todos os {post.comments.length} comentários
                </button>
              )}
              
              <div className="text-xs text-gray-400 mt-1">
                {post.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPostDetail = () => {
    const post = selectedPost ? getPostById(selectedPost) : null;
    
    if (!post) return null;
    
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="py-3 px-4 border-b border-gray-200 flex items-center">
          <button 
            className="mr-4"
            onClick={() => {
              setActiveScreen('feed');
              setSelectedPost(null);
              onInteraction('back_to_feed');
            }}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold">Publicação</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-200 bg-white">
            <div className="p-3 flex items-center justify-between">
              <div 
                className="flex items-center"
                onClick={() => handleViewProfile(post.userId)}
              >
                <div 
                  className="h-10 w-10 rounded-full mr-3 flex items-center justify-center overflow-hidden border border-gray-200"
                  style={{ backgroundColor: `${config.primaryColor}10` }}
                >
                  {getUserById(post.userId).avatar ? (
                    <img 
                      src={getUserById(post.userId).avatar || ''} 
                      alt={getUserById(post.userId).name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <User size={22} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{getUserById(post.userId).name}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{getUserById(post.userId).role}</span>
                    {post.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="flex items-center">
                          <MapPin size={10} className="mr-0.5" /> 
                          {post.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button>
                <MoreHorizontal size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="aspect-square flex items-center justify-center relative">
              {post.image ? (
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div 
                  className="h-full w-full flex items-center justify-center bg-gray-50"
                  style={{ backgroundColor: `${config.primaryColor}10` }}
                >
                  <div className="relative h-full w-full flex items-center justify-center">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                      {Array.from({length: 36}).map((_, i) => (
                        <div key={i} className="border border-black/5"></div>
                      ))}
                    </div>
                    
                    <div 
                      className="w-4/5 p-6 rounded-xl text-center shadow-md"
                      style={{ backgroundColor: `${config.primaryColor}20` }}
                    >
                      <p className="text-base" style={{ color: config.primaryColor }}>
                        {post.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4">
                  <button 
                    className={`text-gray-700 ${post.liked ? 'text-red-500' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart 
                      size={24} 
                      fill={post.liked ? 'currentColor' : 'none'} 
                    />
                  </button>
                  <button 
                    className="text-gray-700"
                    onClick={() => handleViewComments(post.id)}
                  >
                    <MessageSquare size={24} />
                  </button>
                  <button 
                    className="text-gray-700"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 size={24} />
                  </button>
                </div>
                <button 
                  className={`text-gray-700 ${post.bookmarked ? 'text-black' : ''}`}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark 
                    size={24} 
                    fill={post.bookmarked ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>
              
              <div className="text-sm font-semibold mb-1">{post.likes} curtidas</div>
              
              <div className="text-sm">
                <span className="font-semibold mr-1">{getUserById(post.userId).name.split(' ')[0]}</span>
                {post.content}
              </div>
              
              <div className="text-xs text-gray-400 mt-1 mb-3">
                {post.time}
              </div>
              
              {post.comments.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <h3 className="text-sm font-medium mb-2">Comentários</h3>
                  {post.comments.map(comment => (
                    <div key={comment.id} className="flex mb-3">
                      <div 
                        className="h-8 w-8 rounded-full mr-2 flex items-center justify-center overflow-hidden border border-gray-200"
                        style={{ backgroundColor: `${config.primaryColor}10` }}
                      >
                        {getUserById(comment.userId).avatar ? (
                          <img 
                            src={getUserById(comment.userId).avatar || ''} 
                            alt={getUserById(comment.userId).name} 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <User size={18} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold mr-1">{getUserById(comment.userId).name.split(' ')[0]}</span>
                          {comment.text}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {comment.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div 
              className="h-9 w-9 rounded-full mr-3 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: `${config.primaryColor}10` }}
            >
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt="Você" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <User size={20} className="text-gray-500" />
              )}
            </div>
            <div className="flex-1 flex items-center border border-gray-300 rounded-full mr-2 py-2 px-3 overflow-hidden">
              <input 
                type="text" 
                placeholder="Adicione um comentário..." 
                className="flex-1 border-none bg-transparent text-sm focus:outline-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && selectedPost) {
                    handleAddComment(selectedPost);
                  }
                }}
              />
            </div>
            <button 
              className="text-sm font-semibold"
              style={{ color: newComment.trim() ? config.primaryColor : '#9CA3AF' }}
              onClick={() => {
                if (selectedPost && newComment.trim()) {
                  handleAddComment(selectedPost);
                }
              }}
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderComments = () => {
    const post = selectedPost ? getPostById(selectedPost) : null;
    
    if (!post) return null;
    
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="py-3 px-4 border-b border-gray-200 flex items-center">
          <button 
            className="mr-4"
            onClick={() => {
              setActiveScreen('feed');
              setSelectedPost(null);
              onInteraction('back_to_feed');
            }}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold">Comentários</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6 flex">
            <div 
              className="h-10 w-10 rounded-full mr-3 flex items-center justify-center overflow-hidden border border-gray-200"
              style={{ backgroundColor: `${config.primaryColor}10` }}
            >
              {getUserById(post.userId).avatar ? (
                <img 
                  src={getUserById(post.userId).avatar || ''} 
                  alt={getUserById(post.userId).name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <User size={22} className="text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm">
                <span className="font-semibold mr-1">{getUserById(post.userId).name}</span>
                {post.content}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {post.time}
              </div>
            </div>
          </div>
          
          {post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex">
                  <div 
                    className="h-9 w-9 rounded-full mr-3 flex items-center justify-center overflow-hidden border border-gray-200"
                    style={{ backgroundColor: `${config.primaryColor}10` }}
                  >
                    {getUserById(comment.userId).avatar ? (
                      <img 
                        src={getUserById(comment.userId).avatar || ''} 
                        alt={getUserById(comment.userId).name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <User size={20} className="text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold mr-1">{getUserById(comment.userId).name}</span>
                      {comment.text}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">{comment.time}</span>
                      <button className="text-xs font-medium ml-3 text-gray-500">Responder</button>
                      <button className="text-xs ml-3 text-gray-500">
                        <Heart size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div 
                className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <MessageSquare size={28} style={{ color: config.primaryColor }} />
              </div>
              <p className="text-gray-500">Nenhum comentário ainda</p>
              <p className="text-sm text-gray-400 mt-1">Seja o primeiro a comentar</p>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div 
              className="h-9 w-9 rounded-full mr-3 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: `${config.primaryColor}10` }}
            >
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt="Você" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <User size={20} className="text-gray-500" />
              )}
            </div>
            <div className="flex-1 flex items-center border border-gray-300 rounded-full mr-2 py-2 px-3 overflow-hidden">
              <input 
                type="text" 
                placeholder="Adicione um comentário..." 
                className="flex-1 border-none bg-transparent text-sm focus:outline-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && selectedPost) {
                    handleAddComment(selectedPost);
                  }
                }}
              />
            </div>
            <button 
              className="text-sm font-semibold"
              style={{ color: newComment.trim() ? config.primaryColor : '#9CA3AF' }}
              onClick={() => {
                if (selectedPost && newComment.trim()) {
                  handleAddComment(selectedPost);
                }
              }}
            >
              Publicar
            </button>
          </div>
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
            <MessageSquare size={32} style={{ color: config.primaryColor }} />
          </div>
        </div>
        <h3 className="text-center font-bold text-lg mb-2">Erro de conexão</h3>
        <p className="text-center text-gray-600 text-sm mb-4">
          Não foi possível conectar à rede social. Por favor, verifique sua conexão e tente novamente.
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

  // Navigation
  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around">
        <NavItem 
          icon={<Home size={24} />} 
          active={activeScreen === 'feed'} 
          color={config.primaryColor}
          onClick={() => {
            setActiveScreen('feed');
            setSelectedPost(null);
            onInteraction('nav_to_home');
          }}
        />
        <NavItem 
          icon={<Search size={24} />} 
          color={config.primaryColor}
          onClick={() => {
            toast.success('Buscar');
            onInteraction('nav_to_search');
          }}
        />
        <NavItem 
          icon={<PlusCircle size={24} />} 
          color={config.primaryColor}
          onClick={() => {
            toast.success('Criar publicação');
            onInteraction('create_post');
          }}
        />
        <NavItem 
          icon={<Heart size={24} />} 
          color={config.primaryColor}
          onClick={() => {
            toast.success('Atividade');
            onInteraction('nav_to_activity');
          }}
        />
        <NavItem 
          icon={<User size={24} />} 
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

  const NavItem = ({ 
    icon, 
    active = false, 
    color = '#9CA3AF',
    onClick
  }: { 
    icon: React.ReactNode;
    active?: boolean;
    color?: string;
    onClick?: () => void;
  }) => (
    <button 
      className="flex flex-col items-center p-1"
      onClick={onClick}
    >
      <div style={{ color: active ? color : '#9CA3AF' }}>
        {icon}
      </div>
    </button>
  );

  return (
    <div className="h-full flex flex-col relative">
      {showConnectionError && <ConnectionError />}
      {isLoading && <LoadingOverlay />}
      
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'feed' && renderFeed()}
        {activeScreen === 'post' && renderPostDetail()}
        {activeScreen === 'comments' && renderComments()}
      </div>
      
      {activeScreen === 'feed' && <BottomNav />}
    </div>
  );
};

