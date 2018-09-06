import React from 'react';
import Modal from 'react-modal';
import PreviewDisabledCheckbox from './PreviewDisabledCheckbox';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw'
  }
};

const PreviewServiceType = ({ serviceType, isOpen, handleCancel }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleCancel}
    style={customStyles}
    shouldCloseOnEsc={true}
  >
    <div className="bg-dark">
      <h4 className="display-4 text-center text-primary">{serviceType.name}</h4>
      <hr style={{ borderTopColor: 'white' }} />
      <div className=" form-inline w-100 p-2">
        <PreviewDisabledCheckbox value={serviceType.airFilter} label="Air filter" />
        <PreviewDisabledCheckbox value={serviceType.atf} label="Atf" />
        <PreviewDisabledCheckbox value={serviceType.brakeFluidChanged} label="Brake fluid changed" />
        <PreviewDisabledCheckbox value={serviceType.dsgOilAndFilter} label="Dsg oil and filter" />
        <PreviewDisabledCheckbox value={serviceType.dustAndPollenFilter} label="dust and pollen filter" />
        <PreviewDisabledCheckbox value={serviceType.fuelFilter} label="Fuel filter" />
        <PreviewDisabledCheckbox value={serviceType.haldexCouplingOil} label="haldex coupling oil" />
        <PreviewDisabledCheckbox value={serviceType.inspectionService} label="Inspection service" />
        <PreviewDisabledCheckbox value={serviceType.intervalService} label="Interval service" />
        <PreviewDisabledCheckbox value={serviceType.longLifeOilUsed} label="Long life oil used" />
        <PreviewDisabledCheckbox value={serviceType.naturalGasTankAndPipelines} label="Natural gas tank and pipelines" />
        <PreviewDisabledCheckbox value={serviceType.oilChangeService} label="oil change service" />
        <PreviewDisabledCheckbox value={serviceType.sparkPlugs} label="Spark plugs" />
        <PreviewDisabledCheckbox value={serviceType.tireFillerBottle} label="Tire filler bottle" />
        <PreviewDisabledCheckbox value={serviceType.tirePressureSensors} label="Tire pressire sensors" />
        <PreviewDisabledCheckbox value={serviceType.toothedBelt} label="Toothed belt" />
      </div>
      <p className="text-muted text-center">Click outside the preview or press esc to close.</p>
    </div>

  </Modal >
);

export default PreviewServiceType;