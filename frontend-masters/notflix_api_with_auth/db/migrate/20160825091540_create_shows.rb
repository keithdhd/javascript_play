class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :title
      t.string :year
      t.text :description
      t.string :poster
      t.string :imdbID
      t.string :trailer

      t.timestamps null: false
    end
  end
end
