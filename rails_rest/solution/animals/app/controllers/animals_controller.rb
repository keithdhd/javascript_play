class AnimalsController < ApplicationController
  def index
    @animals = Animal.all
    render :json => @animals.as_json(methods: :move)
  end

  def show
    @animal = Animal.find(params[:id])
    render :json => @animal.as_json(methods: :move)
  end

  def create
    animal = Animal.create( animal_params )
    render json: animal, status: :created
  end

  def destroy
    animal = Animal.find(params[:id])
    if animal.destroy!
      render nothing: true
    else
      render status: :unprocessable_entity
    end
  end

  def update
    animal = Animal.find(params[:id])
    if animal.update_attributes(animal_params)
      render json: animal , status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  private
  def animal_params
    params.require(:animal).permit([:name, :legs])
  end
end
