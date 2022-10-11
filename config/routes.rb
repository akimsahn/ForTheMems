Rails.application.routes.draw do
  resources :friend_memories, only: [:create, :destroy]
  resources :friends
  resources :memories, only: [:index, :create, :destroy]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
