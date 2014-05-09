require 'test_helper'

class InstrumentPatchesControllerTest < ActionController::TestCase
  setup do
    @instrument_patch = instrument_patches(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:instrument_patches)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create instrument_patch" do
    assert_difference('InstrumentPatch.count') do
      post :create, instrument_patch: { instrument_id: @instrument_patch.instrument_id, patch_id: @instrument_patch.patch_id }
    end

    assert_redirected_to instrument_patch_path(assigns(:instrument_patch))
  end

  test "should show instrument_patch" do
    get :show, id: @instrument_patch
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @instrument_patch
    assert_response :success
  end

  test "should update instrument_patch" do
    patch :update, id: @instrument_patch, instrument_patch: { instrument_id: @instrument_patch.instrument_id, patch_id: @instrument_patch.patch_id }
    assert_redirected_to instrument_patch_path(assigns(:instrument_patch))
  end

  test "should destroy instrument_patch" do
    assert_difference('InstrumentPatch.count', -1) do
      delete :destroy, id: @instrument_patch
    end

    assert_redirected_to instrument_patches_path
  end
end
