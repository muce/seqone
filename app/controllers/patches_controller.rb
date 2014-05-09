class PatchesController < ApplicationController
  before_action :set_patch, only: [:show, :edit, :update, :destroy]

  # GET /patches
  # GET /patches.json
  def index
    @patches = Patch.all
  end

  # GET /patches/1
  # GET /patches/1.json
  def show
  end

  # GET /patches/new
  def new
    @patch = Patch.new
  end

  # GET /patches/1/edit
  def edit
  end

  # POST /patches
  # POST /patches.json
  def create
    @patch = Patch.new(patch_params)

    respond_to do |format|
      if @patch.save
        format.html { redirect_to @patch, notice: 'Patch was successfully created.' }
        format.json { render action: 'show', status: :created, location: @patch }
      else
        format.html { render action: 'new' }
        format.json { render json: @patch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patches/1
  # PATCH/PUT /patches/1.json
  def update
    respond_to do |format|
      if @patch.update(patch_params)
        format.html { redirect_to @patch, notice: 'Patch was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @patch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patches/1
  # DELETE /patches/1.json
  def destroy
    @patch.destroy
    respond_to do |format|
      format.html { redirect_to patches_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patch
      @patch = Patch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patch_params
      params.require(:patch).permit(:name)
    end
end
