class ShowsController < ApplicationController

    def index
      shows = Show.all  
      render :json => shows.to_json()
    end

    private
    def comment_params
      params.require(:show).permit(:title, :year, :description, :poster, :imdbID, :trailer)
    end

end
