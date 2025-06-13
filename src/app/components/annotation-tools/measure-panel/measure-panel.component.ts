import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ColorHelper } from 'src/app/helpers/color.helper';
import { RxCoreService } from 'src/app/services/rxcore.service';
import { RXCore } from 'src/rxcore';
import { MARKUP_TYPES, METRIC } from 'src/rxcore/constants';
import { AnnotationToolsService } from '../annotation-tools.service';
import { MeasurePanelService } from './measure-panel.service';
import { MetricUnitType } from 'src/app/domain/enums';
import { 
  MeasureOption, 
  metricUnitsOptions, 
  imperialUnitsOptions, 
  precisionOptions, 
  presetOptions,
  metricSystemOptions,
  PresetOption,
} from 'src/app/shared/measure-options';
@Component({
  selector: 'rx-measure-panel',
  templateUrl: './measure-panel.component.html',
  styleUrls: ['./measure-panel.component.scss'],
})
export class MeasurePanelComponent implements OnInit, OnDestroy {
  @Input() maxHeight: number = Number.MAX_SAFE_INTEGER;
  @Input() draggable: boolean = true;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  private stateSubscription: Subscription;
  private guiMarkupSubscription: Subscription;
  private guifileloadSub: Subscription;
  bounds: HTMLElement = document.getElementById('mainContent') as HTMLElement;
  MetricUnitType = MetricUnitType;
  MARKUP_TYPES = MARKUP_TYPES;
  visible: boolean = false;
  created: boolean = true;
  type: number = MARKUP_TYPES.MEASURE.LENGTH.type;
  color: string;
  lengthMeasureType: number;
  strokeThickness: number;
  strokeLineStyle: number;
  snap: boolean;
  expandedIndex: number | null = 0;
  metricUnitsOptions = metricUnitsOptions;
  imperialUnitsOptions = imperialUnitsOptions;
  precisionOptions = precisionOptions;
  metricSystemOptions = metricSystemOptions;
  presetOptions = presetOptions;
  selectedMetricType = MetricUnitType.METRIC;
  selectedMetricUnit: MeasureOption;
  selectedScalePrecision: MeasureOption;
  calibrateLength: string;
  measuredCalibrateLength: string;
  calibrateScale: string;
  isSelectedCalibrate: boolean;
  isCalibrateFinished: boolean;
  currentScale: string;
  activeScale: string;
  isActivefile: boolean;
  setlabelonfileload: boolean = false;
  customPageScaleValue: number;
  customDisplayScaleValue: number;
  currentPageMetricUnitCalibrate: string;
  selectedScale: any;
  scalesOptions: any = [];

  private _setDefaults(): void {
    this.created = false;
    this.color = '#333C4E';
    this.strokeThickness = 1;
    this.strokeLineStyle = 0;
    this.lengthMeasureType = 0;
    this.snap = false;
    this.calibrateLength = '0';
    this.measuredCalibrateLength = '0';
    this.calibrateScale = '';
    this.isSelectedCalibrate = false;
    this.isCalibrateFinished = false;
    this.customPageScaleValue = 1;
    this.customDisplayScaleValue = 1;
    this.selectedMetricUnit = this.metricUnitsOptions[0];
    this.currentPageMetricUnitCalibrate = 'Millimeter';
    this.selectedScalePrecision = this.precisionOptions[2];
  }

  constructor(
    private readonly rxCoreService: RxCoreService,
    private readonly annotationToolsService: AnnotationToolsService,
    private readonly colorHelper: ColorHelper,
    private readonly measurePanelService: MeasurePanelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._setDefaults();

    this.guifileloadSub = this.rxCoreService.guiFileLoadComplete.subscribe(
      () => {
        let scaleobject = {
          dimPrecision: 2,
          isSelected: true,
          label: '1000 Millimeter : 1 Meter',
          metric: '0',
          metricUnit: 'Meter',
          value: '1000:1000',
        };

        //this.setlabelonfileload = true;

        let obj = {
          value: scaleobject.value,
          label: scaleobject.label,
          metric: scaleobject.metric,
          metricUnit: scaleobject.metricUnit,
          dimPrecision: scaleobject.dimPrecision,
          isSelected: scaleobject.isSelected,
        };

        //this.scalesOptions.push(obj);
        //this.selectedScale = obj;
        //this.applyScale(scaleobject);
      }
    );

    this.stateSubscription =
      this.annotationToolsService.measurePanelState$.subscribe((state) => {
        this.visible = state.visible;

        this.measurePanelService.setMeasureScaleState({ visible: true });

        if (this.visible) {
          this.setCurrentPageScale();
        }

        //set page scale when calibrate cancelled
        if (!this.visible && this.isSelectedCalibrate) {
          this.cancelCalibrate();

          if (this.selectedScale) {
            this.applyScale(this.selectedScale);
          }

          this.measuredCalibrateLength = '0';
        }
      });

    this.rxCoreService.guiCalibrateFinished$.subscribe((state) => {
      this.calibrateLength = parseFloat(state.data || '0').toFixed(
        this.countDecimals(this.selectedScalePrecision?.value as number)
      );
      this.measuredCalibrateLength = this.calibrateLength;
      this.isCalibrateFinished = state.isFinished;
      if (state.isFinished) {
        this.calibrateScale = this.currentScale;
      }
    });

    // this.guiMarkupSubscription = this.rxCoreService.guiMarkup$.subscribe(({markup, operation}) => {
    //   this._setDefaults();
    //   this.visible = false;

    //   if (markup == -1 || operation.deleted) {
    //     return;
    //   }

    //   this.type = markup.type;
    //   this.color = this.colorHelper.rgbToHex(markup.strokecolor);
    //   this.strokeThickness = markup.linewidth;
    //   this.strokeLineStyle = markup.linestyle;
    //   this.lengthMeasureType = markup.subtype;
    // });

    this.rxCoreService.guiConfig$.subscribe((config) => {
      if (config.disableMarkupMeasureButton === true) {
        this.visible = false;
      }
    });

    this.rxCoreService.guiState$.subscribe((state) => {
      if (state?.activefile) {
        this.isActivefile = true;
      }
    });

    this.rxCoreService.guiPage$.subscribe(() => {
      this.loadAndSetPageScale();
    });

    this.rxCoreService.guiScaleListLoadComplete$.subscribe(() => {
      this.loadAndSetPageScale();
    });
  }

  ngOnDestroy(): void {
    debugger
    this.stateSubscription?.unsubscribe();
    this.guiMarkupSubscription?.unsubscribe();
    this.guifileloadSub?.unsubscribe();
  }
  

  onLengthMeasureTypeChange(type: number): void {
    this.lengthMeasureType = type;
    if (this.created) {
      RXCore.markUpDimension(true, type);
    } else {
      RXCore.markUpSubType(type);
    }
  }

  onColorSelect(color): void {
    this.color = color;
    RXCore.setGlobalStyle(true);
    RXCore.changeStrokeColor(color);
  }

  onStrokeThicknessChange(): void {
    RXCore.setLineWidth(this.strokeThickness);
  }

  onStrokeLineStyleSelect(lineStyle: number): void {
    this.strokeLineStyle = lineStyle;
    RXCore.setLineStyle(lineStyle);
  }

  onSnapChange(onoff: boolean): void {
    RXCore.changeSnapState(onoff);
  }

  loadAndSetPageScale(): void {
    if (RXCore.getDocScales()) {
      this.scalesOptions = [];
      this.loadScaleList();
      this.setCurrentPageScale();
    }
  }

  setCurrentPageScale(): void {
    const scaleLabel = RXCore.getCurrentPageScaleLabel();

    if (!scaleLabel) {
      return;
    }

    if (this.scalesOptions.length) {
      this.selectedScale = this.scalesOptions.find(
        (item) => item.label === scaleLabel
      );

      if (this.selectedScale) {
        this.currentScale = this.selectedScale.label;
        this.measurePanelService.setMeasureScaleState({
          visible: true,
          value: this.currentScale,
        });
      } else {
        this.selectedScale = this.scalesOptions[0];
      }
    }
  }

  selectMetricUnit(unit: any, type: MetricUnitType): void {
    this.selectedMetricUnit = unit;
    this.selectedMetricType = type;
  }

  onScalePrecisionChanged(precision: any): void {
    this.selectedScalePrecision = precision;
  }

  onCloseClick(): void {
    this._setDefaults();
    this.annotationToolsService.setMeasurePanelState({ visible: false });
    this.onClose.emit();
  }

  calibrate(selected: boolean): void {
    //select to default scale before calibrate starts
    this.applyScaleToDefault();

    RXCore.onGuiCalibratediag(onCalibrateFinished);
    let rxCoreSvc = this.rxCoreService;
    function onCalibrateFinished(data) {
      rxCoreSvc.setCalibrateFinished(true, data);
    }

    RXCore.calibrate(selected);
    this.annotationToolsService.setSnapState(true);
  }

  onCalibrateCheckedChange(event: boolean): void {
    this.isSelectedCalibrate = event;
    this.isSelectedCalibrate ? this.calibrate(true) : this.cancelCalibrate();
    this.measuredCalibrateLength = '0.00';
  }

  countDecimals(value: number): number {
    return value % 1 ? value.toString().split('.')[1].length : 0;
  }

  cancelCalibrate(): void {
    let snap = RXCore.getSnapState();
    RXCore.calibrate(false);

    this.isSelectedCalibrate = false;
    this.isCalibrateFinished = false;

    this.calibrateLength = '0';

    if (snap === false) {
      RXCore.changeSnapState(false);
    }

    this.setCurrentPageScale();
  }

  updateMetric(selectedMetricType: MetricUnitType): void {
    switch (selectedMetricType) {
      case MetricUnitType.METRIC:
        RXCore.setUnit(1);
        break;
      case MetricUnitType.IMPERIAL:
        RXCore.setUnit(2);
        break;
    }
  }

  updateMetricUnit(metric: MetricUnitType, metricUnit: string): void {
    if (metric === METRIC.UNIT_TYPES.METRIC) {
      RXCore.metricUnit(metricUnit);
    } else if (metric === METRIC.UNIT_TYPES.IMPERIAL) {
      RXCore.imperialUnit(metricUnit);
    }
  }

  convertToMM(value: string): number {
    let unitScale = 1;

    if (value === 'Centimeter') {
      unitScale = 10;
    } else if (value === 'Decimeter') {
      unitScale = 100;
    } else if (value === 'Meter') {
      unitScale = 1000;
    } else if (value === 'Kilometer') {
      unitScale = 1000000;
    } else if (value === 'Nautical Miles') {
      unitScale = 185200000;
    } else if (value === 'Inch') {
      unitScale = 25.4;
    }

    return unitScale;
  }

  convertToInch(value: string): number {
    let unitScale = 1;

    if (value === 'Feet') {
      unitScale = 12;
    } else if (value === 'Yard') {
      unitScale = 36;
    } else if (value === 'Mile') {
      unitScale = 63360;
    } else if (value === 'Nautical Miles') {
      unitScale = 72913.3858;
    } else if (value === 'Millimeter') {
      unitScale = 0.0393701;
    } else if (value === 'Centimeter') {
      unitScale = 0.393701;
    }

    return unitScale;
  }

  calculateScale(): string {
    let selectedMetricForPage = '1';
    let unitScaleForPage;
    let unitScaleForDisplay;

    if (selectedMetricForPage === this.selectedMetricType) {
      unitScaleForPage = 1;
      unitScaleForDisplay =
        this.selectedMetricType === MetricUnitType.METRIC
          ? this.convertToMM(this.selectedMetricUnit.label)
          : this.convertToInch(this.selectedMetricUnit.label);
    } else {
      unitScaleForPage = 1;
      unitScaleForDisplay = 1;
    }

    const scaleForPage = this.customPageScaleValue * unitScaleForPage;
    const scaleForDisplay = this.customDisplayScaleValue * unitScaleForDisplay;

    return `${scaleForPage}:${scaleForDisplay}`;
  }

  applyScale(selectedScaleObj: any): void {
    this.updateMetric(selectedScaleObj.metric as MetricUnitType);
    this.updateMetricUnit(selectedScaleObj.metric as MetricUnitType, selectedScaleObj.metricUnit);
    RXCore.setDimPrecisionForPage(
      this.countDecimals(this.selectedScalePrecision?.value as number)
    );
    RXCore.scale(selectedScaleObj.value);
    RXCore.setScaleLabel(selectedScaleObj.label);

    this.scalesOptions = this.setPropertySelected(
      this.scalesOptions,
      'isSelected',
      'label',
      selectedScaleObj.label
    );

    RXCore.updateScaleList(this.scalesOptions);

    this.currentScale = selectedScaleObj.label;
    this.measurePanelService.setMeasureScaleState({
      visible: true,
      value: this.currentScale,
    });

    if (this.isSelectedCalibrate) {
      this.isSelectedCalibrate = false;
      this.isCalibrateFinished = false;
    }

    if (this.setlabelonfileload) {
      this.setCurrentPageScale();
      this.setlabelonfileload = false;
    }
  }

  applyScaleToDefault(rerenderMeasurePanel = false): void {
    this.updateMetric(MetricUnitType.METRIC);
    this.updateMetricUnit(MetricUnitType.METRIC, 'Millimeter');
    RXCore.setDimPrecisionForPage(3);
    RXCore.scale('1:1');

    this.currentScale = 'Unscaled';
    this.measurePanelService.setMeasureScaleState({
      visible: true,
      value: this.currentScale,
    });

    if (rerenderMeasurePanel) {
      let mrkUp: any = RXCore.getSelectedMarkup();

      if (!mrkUp.isempty) {
        RXCore.unSelectAllMarkup();
        RXCore.selectMarkUpByIndex(mrkUp.markupnumber);
      }
    }
  }

  addNewScale(): void {
    // const getPageScaleObject = RXCore.getPageScaleObject(0);
    // console.log(getPageScaleObject);
    // if (scale) {
    //   this.selectedScale = scale;
    //   this.applyScale(this.selectedScale);
    //   this.onCloseClick();
    //   return;
    // }

    if (this.isSelectedCalibrate) {
      this.applyCalibrate();
      return;
    }

    let scaleLabel = `${this.customPageScaleValue} ${this.selectedMetricUnit.label} : ${this.customDisplayScaleValue} ${this.selectedMetricUnit.label}`;
    const scaleObj = this.scalesOptions.find(
      (item) => item.label === scaleLabel
    );

    if (scaleObj) {
      this.selectedScale = scaleObj;
      this.applyScale(this.selectedScale);
      this.onCloseClick();
      return;
    }

    let scale = this.calculateScale();
    let obj = {
      value: scale,
      label: scaleLabel,
      metric: this.selectedMetricType,
      metricUnit: this.selectedMetricUnit.label,
      dimPrecision: this.countDecimals(this.selectedScalePrecision?.value as number),
      isSelected: true,
    };

    this.scalesOptions.push(obj);
    this.selectedScale = obj;
    this.applyScale(this.selectedScale);

    this.currentScale = this.selectedScale.label;

    this.measurePanelService.setMeasureScaleState({
      visible: true,
      value: this.currentScale,
    });
    this.measurePanelService.setScaleState({
      created: true,
      scaleLabel: this.selectedScale.label,
    });

    //set to default value
    this.customPageScaleValue = 1;
    this.customDisplayScaleValue = 1;
    this.selectedMetricUnit = this.metricUnitsOptions[0];
    this.selectedScalePrecision = this.precisionOptions[2];

    this.onCloseClick();
  }

  applyCalibrate(): void {
    if (
      this.measuredCalibrateLength === this.calibrateLength &&
      this.currentPageMetricUnitCalibrate === this.selectedMetricUnit.label
    ) {
      return;
    }

    this.updateMetric(this.selectedMetricType);
    this.updateMetricUnit(this.selectedMetricType, this.selectedMetricUnit.label);

    this.calibrateLength = this.calibrateLength.trim();
    const calibrateconn = RXCore.getCalibrateGUI();

    const converttedCalibrateLength =
      parseInt(this.calibrateLength) *
      (this.selectedMetricType === MetricUnitType.METRIC
        ? this.convertToMM(this.selectedMetricUnit.label)
        : this.convertToInch(this.selectedMetricUnit.label));

    calibrateconn.SetTempCal(converttedCalibrateLength);
    calibrateconn.setCalibrateScaleByLength();

    if (!Number.isFinite(calibrateconn.getMeasureScale())) {
      return;
    }

    calibrateconn.setCalibration(true);

    RXCore.setDimPrecisionForPage(
      this.countDecimals(this.selectedScalePrecision?.value as number)
    );

    RXCore.scale('Calibration');

    let measureScale = calibrateconn.getMeasureScale().toFixed(2);
    measureScale = parseFloat(measureScale);

    const scaleVaue = `1:${measureScale}`;
    const pageScaleLebel = this.selectedMetricType === MetricUnitType.METRIC ? this.currentPageMetricUnitCalibrate : 'Inch';
    const convertedMeasureScale =
      this.selectedMetricType === MetricUnitType.METRIC
        ? (
            measureScale / this.convertToMM(this.selectedMetricUnit.label)
          ).toFixed(2)
        : (
            measureScale / this.convertToInch(this.selectedMetricUnit.label)
          ).toFixed(2);

    const scaleLabel = `1 ${pageScaleLebel} : ${convertedMeasureScale} ${this.selectedMetricUnit.label}`;
    RXCore.setScaleLabel(scaleLabel);

    RXCore.calibrate(false);

    this.isSelectedCalibrate = false;
    RXCore.scale(scaleVaue);
    //set measuredCalibrateLength to 0 once calibration complete
    this.measuredCalibrateLength = '0';
    
    let obj = {
      value: scaleVaue,
      label: scaleLabel,
      metric: this.selectedMetricType,
      metricUnit: this.selectedMetricUnit.label,
      dimPrecision: this.countDecimals(this.selectedScalePrecision?.value as number),
      isSelected: true,
    };

    this.scalesOptions.push(obj);
    this.selectedScale = obj;
    this.scalesOptions = this.setPropertySelected(
      this.scalesOptions,
      'isSelected',
      'label',
      this.selectedScale.label
    );

    RXCore.updateScaleList(this.scalesOptions);

    this.currentScale = this.selectedScale.label;

    this.measurePanelService.setMeasureScaleState({
      visible: true,
      value: this.currentScale,
    });
    this.measurePanelService.setScaleState({
      created: true,
      scaleLabel: this.selectedScale.label,
    });

    this.onCloseClick();
  }

  loadScaleList(): void {
    const scales: any = RXCore.getDocScales();

    if (scales && scales.length) {
      this.scalesOptions = [];
      for (let i = 0; i < scales.length; i++) {
        this.scalesOptions.push(scales[i]);
      }
    } else {
      this.insertUnscaled();
    }
  }

  insertUnscaled(): void {
    this.currentScale = 'Unscaled';
    this.measurePanelService.setMeasureScaleState({
      visible: true,
      value: this.currentScale,
    });
  }

  setPropertySelected(array: any[], property: string, conditionKey: string, conditionValue: any): any[] {
    // First, set all items to false
    array.forEach(obj => obj[property] = false);
    // Then set only the matching item to true
    array.forEach(obj => {
      if (obj[conditionKey] === conditionValue) {
        obj[property] = true;
      }
    });
    return array;
  }

  showSuccess(): void {
    this.toastr.success(
      'Start measuring by selecting one of the measurement tools.',
      'Scale has been successfully set',
      {
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
      }
    );
  }

  onRadioSelectionChange(value: MetricUnitType): void {
    this.selectedMetricType = value;
  }

  onExpandedIndexChange(index: number | null): void {
    if (this.expandedIndex !== index) {
      this.expandedIndex = index;

      if (this.expandedIndex === 2) { // Calibrate
        this.measuredCalibrateLength = '0.00';
        this.isSelectedCalibrate = true;
        this.calibrate(true);
      } else {
        this.measuredCalibrateLength = '0.00';
        this.isSelectedCalibrate = false;
        this.cancelCalibrate();
      }
    }
  }

  onPresetChanged(preset: PresetOption): void {
    this.customPageScaleValue = preset.pageScaleValue;
    this.customDisplayScaleValue = preset.customScaleValue;
  }
}
