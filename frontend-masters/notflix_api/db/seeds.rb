# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Show.destroy_all

Show.create!(
    {
        title: "The Great British Bake Off",
        series: 7,
        description: "Master bakers Mary & Paul and the incomparable presenting duo of Mel & Sue are back for the sixth series of The Great British Bake Off.",
        image: "palceholder.jpg",
        programmeID: "b013pqnm"
    }
)

Show.create!(
     {
        title: "Storyville",
        series: 9,
        description: "Series showcasing the best in international documentaries",
        image: "palceholder.jpg",
        programmeID: "b006mfx6"
    }
)
