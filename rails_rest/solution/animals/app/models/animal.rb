class Animal < ActiveRecord::Base
  def move
    return "slither" if !self.legs || self.legs < 1
    "walk"
  end
end
