class PicturePlantCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  _click(entity) {
      this._fire('hass-more-info', { entityId: entity });
  }

  _fire(type, detail) {

      const event = new Event(type, {
          bubbles: true,
          cancelable: false,
          composed: true
      });
      event.detail = detail || {};
      this.shadowRoot.dispatchEvent(event);
      return event;
}

  set hass(hass) {
    const config = this.config;

    var _title = config.title;

    if(!config.title){
      _title = hass.states[config.entity].attributes.friendly_name;
    }

    this.shadowRoot.getElementById('box').innerHTML = `
      <div class="title">${_title}</div>
      <div id="sensors">
      </div>
    `;

    var _entities = [
      hass.states[config.entity].attributes.sensors.moisture,
      hass.states[config.entity].attributes.sensors.conductivity,
      hass.states[config.entity].attributes.sensors.temperature,
      hass.states[config.entity].attributes.sensors.brightness,
      hass.states[config.entity].attributes.sensors.battery
    ]

    var _sensors = [
        'moisture',
        'conductivity',
        'temperature',
        'brightness',
        'battery'
    ];

    const _icons = [
      'mdi:water',
      'mdi:emoticon-poop',
      'mdi:thermometer-lines',
      'mdi:white-balance-sunny',
      'mdi:battery'
    ]

    for (var i=0; i < _entities.length; i++) {
      var _sensor = _entities[i];
      var _name = hass.states[_sensor].attributes.friendly_name;
      var _state = hass.states[_sensor].state;
      var _uom = hass.states[_sensor].attributes.unit_of_measurement;
      var _icon = hass.states[_sensor].attributes.icon;
      var _class = "state-on";
      if ( hass.states[config.entity].attributes.problem.indexOf(_sensors[i]) != -1){
        _class += ' state-problem';
      }

      this.shadowRoot.getElementById('sensors').innerHTML += `
        <div id="sensor${i}" class="sensor">
          <div class="icon"><ha-icon icon="${_icons[i]}" class="${_class}" title="${_name}: ${_state} ${_uom}"></ha-icon></div>
        </div>
      `;
    }

    for (var i=0; i < _entities.length; i++) {
       this.shadowRoot.getElementById('sensor'+[i]).onclick = this._click.bind(this, _entities[i]);
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    if (!config.image) {
      throw new Error('You need to define an image');
    }

    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    this.config = config;

    const card = document.createElement('ha-card');
    const content = document.createElement('div');
    const style = document.createElement('style');

    style.textContent = `
      ha-card {
        position: relative;
        padding: 0;
        background-size: 100%;
        background-image: url(/local/plant_img/dieffenbachia.png);
      }

      img {
          display: block;
          height: auto;
          transition: filter .2s linear;
          width: 100%;
      }

      .box {
          white-space: var(--paper-font-common-nowrap_-_white-space); overflow: var(--paper-font-common-nowrap_-_overflow); text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          padding: 4px 8px;
          font-size: 16px;
          line-height: 40px;
          color: white;
          display: flex;
          justify-content: space-between;
      }

      .box .title {
        font-weight: 500;
        margin-left: 8px;
      }

      .box .sensor {
        float: left;
      }
      ha-icon {
        cursor: pointer;
        padding: 8px;
        color: #A9A9A9;
      }

      ha-icon.state-on {
        color: white;
      }

      ha-icon.state-problem {
        color: red;
      }
    `;

    content.id = "container";
    content.innerHTML = `
    <div id="wrapper">
      <img src="${config.image} " />
    </div>
    <div class="box" id="box"></div>
    `;
    card.appendChild(content);
    card.appendChild(style);
    root.appendChild(card);
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('picture-plant-card', PicturePlantCard);
