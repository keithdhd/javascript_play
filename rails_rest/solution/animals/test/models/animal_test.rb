require 'test_helper'

class AnimalTest < ActiveSupport::TestCase
  test "Animals have a name" do
    assert animals(:one).name == "Tiger"
  end

  test "Animals have legs" do
    assert animals(:one).legs == 4
  end

  test "Animals with legs walk" do
    assert animals(:one).move == "walk"
  end

  test "Animals that dont slither" do
    assert animals(:two).move == "slither"
  end
end
