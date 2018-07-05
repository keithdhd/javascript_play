#Rails Rest

##Learning Objectives
 - Show making a rest JSON API in rails.

#Intro
  We want to to extend our animals application so that we can see specific animals (show).  And add animals (new create).  We are no longer going to be concerned with rendering html. We are going to focus on handling/serving JSON. To do this let's edit our application so we are only concerned with handling JSON.
  ```
  class AnimalsController < ApplicationController
    respond_to :json

    def index
      @animals = Animal.all
      render :json => @animals
    end
  end
  ```

#Show
  What url will we need to go to show the animal with id 1. According to the rest convention?
    http://localhost:3000/animals/1

  How can we set up the route for this?
    config/routes.rb

  What action do we need to setup
    show

  What information do we want the controller to get and pass as json?
    Animal with the id that was passed into the route

  How do we get this?
    To get the data from the request we can use the params hash.  In the route we have defined a special route, stating that what is passed after animals/ will be in the params hash as id.

  *Debugging aside*
  One of the easiest ways to debug in rails is to just raise an error.  We can then access an interactive console in the browser.
  
  ```
  def show
    raise
  end
  ```
  
  browser terminal

  ```
  >>  params
  => {"controller"=>"animals", "action"=>"show", "id"=>"1"}
  ```

  We can see the params hash gives us the controller action, and the id.

  How we do we get the model with this id?

  ```
  def show
    @animal = Animal.find(params[:id])
    raise
  end
  ```

  ```
  def show
    @animal = Animal.find(params[:id])
    respond_to do |format|
      format.json{ render :json => @animal }
    end
  end
  ```
  
  To get JSON
  http://localhost:3000/animals/1.json


##Creating an animal
  What do we need to create an animal?
  Route to create an animal?
    POST http://localhost:3000/animals

  [i]:  new restful route is to provide a form, to give the details to create.  As this is just a JSON api we are creating the new route is not required.

  Rails has functionality out the box for restful routes.
  We can see the routes we have set up using the command

  ```
    rake routes
  ```

  We can see the two restful routes we have setup.

  To add the post route we could add.

  config/routes.rb
  ```
    post 'animals' => 'animals#create'
  ```
  However we can setup routes for all the restful routes, using the resources route.

  rake routes will show all the routes that have been set up.

  Check our current routes still work.

  We can also default to json rather than html if no format is specified.

  ```
    resources :animals, defaults: {format: :json}
  ```

##Testing our post request.
  Testing our post request. Insomnia
  POST localhost:3000/animals {"animal": {"name": "Sheep"}}

  Strong parameters, we need to white list what we can pass when create an animal.

  Application Controller

  ```
  protect_from_forgery with: :null_session
  ```

  ```
  def create
    animal = Animal.create( params.require(:animal).permit([:name, :legs]) )
    render({ :json => animal })
  end

  ```

We have created an API that allows us to add animals and get them as JSON.

#Lab
Extend the application so that animals can be updated and deleted.
Pass the output of the walk method in the json output.
