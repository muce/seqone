class InstrumentPatchesController < ApplicationController
  before_action :set_instrument_patch, only: [:show, :edit, :update, :destroy]

  # GET /instrument_patches
  # GET /instrument_patches.json
  def index
    @instrument_patches = InstrumentPatch.all
  end

  # GET /instrument_patches/1
  # GET /instrument_patches/1.json
  def show
  end

  # GET /instrument_patches/new
  def new
    @instrument_patch = InstrumentPatch.new
  end

  # GET /instrument_patches/1/edit
  def edit
  end

  # POST /instrument_patches
  # POST /instrument_patches.json
  def create
    @instrument_patch = InstrumentPatch.new(instrument_patch_params)

    respond_to do |format|
      if @instrument_patch.save
        format.html { redirect_to @instrument_patch, notice: 'Instrument patch was successfully created.' }
        format.json { render action: 'show', status: :created, location: @instrument_patch }
      else
        format.html { render action: 'new' }
        format.json { render json: @instrument_patch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /instrument_patches/1
  # PATCH/PUT /instrument_patches/1.json
  def update
    respond_to do |format|
      if @instrument_patch.update(instrument_patch_params)
        format.html { redirect_to @instrument_patch, notice: 'Instrument patch was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @instrument_patch.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /instrument_patches/1
  # DELETE /instrument_patches/1.json
  def destroy
    @instrument_patch.destroy
    respond_to do |format|
      format.html { redirect_to instrument_patches_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_instrument_patch
      @instrument_patch = InstrumentPatch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def instrument_patch_params
      params.require(:instrument_patch).permit(:instrument_id, :patch_id)
    end
end
