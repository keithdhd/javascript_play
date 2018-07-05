class ShowsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    shows = Show.all
    render :json => shows.to_json()
  end

end
