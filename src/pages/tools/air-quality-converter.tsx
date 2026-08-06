import React, {useMemo, useState} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './air-quality-converter.module.css';

type Breakpoint = {
  label: string;
  color: string;
  textColor?: string;
  pmLow: number;
  pmHigh: number;
  aqiLow: number;
  aqiHigh: number;
  description: string;
};

const PM_MAX = 325.4;
const AQI_MAX = 500;

const breakpoints: Breakpoint[] = [
  {
    label: 'Good',
    color: '#00e400',
    pmLow: 0,
    pmHigh: 9,
    aqiLow: 0,
    aqiHigh: 50,
    description: 'Air quality is satisfactory for most people.',
  },
  {
    label: 'Moderate',
    color: '#ffff00',
    pmLow: 9.1,
    pmHigh: 35.4,
    aqiLow: 51,
    aqiHigh: 100,
    description: 'Unusually sensitive people should consider reducing prolonged outdoor exertion.',
  },
  {
    label: 'Unhealthy for Sensitive Groups',
    color: '#ff7e00',
    pmLow: 35.5,
    pmHigh: 55.4,
    aqiLow: 101,
    aqiHigh: 150,
    description: 'People with heart or lung disease, older adults, children, and teens may be affected.',
  },
  {
    label: 'Unhealthy',
    color: '#ff0000',
    textColor: '#fff',
    pmLow: 55.5,
    pmHigh: 125.4,
    aqiLow: 151,
    aqiHigh: 200,
    description: 'Some members of the general public may experience health effects.',
  },
  {
    label: 'Very Unhealthy',
    color: '#8f3f97',
    textColor: '#fff',
    pmLow: 125.5,
    pmHigh: 225.4,
    aqiLow: 201,
    aqiHigh: 300,
    description: 'Health alert: the risk of health effects is increased for everyone.',
  },
  {
    label: 'Hazardous',
    color: '#7e0023',
    textColor: '#fff',
    pmLow: 225.5,
    pmHigh: PM_MAX,
    aqiLow: 301,
    aqiHigh: AQI_MAX,
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function interpolate(value: number, inputLow: number, inputHigh: number, outputLow: number, outputHigh: number) {
  return ((outputHigh - outputLow) / (inputHigh - inputLow)) * (value - inputLow) + outputLow;
}

function getBreakpointFromPm(pm: number) {
  return breakpoints.find((bucket) => pm <= bucket.pmHigh) ?? breakpoints[breakpoints.length - 1];
}

function getBreakpointFromAqi(aqi: number) {
  return breakpoints.find((bucket) => aqi <= bucket.aqiHigh) ?? breakpoints[breakpoints.length - 1];
}

function pmToAqi(pm: number) {
  const boundedPm = clamp(pm, 0, PM_MAX);
  const bucket = getBreakpointFromPm(boundedPm);
  return Math.round(interpolate(boundedPm, bucket.pmLow, bucket.pmHigh, bucket.aqiLow, bucket.aqiHigh));
}

function aqiToPm(aqi: number) {
  const boundedAqi = clamp(aqi, 0, AQI_MAX);
  const bucket = getBreakpointFromAqi(boundedAqi);
  return Math.round(interpolate(boundedAqi, bucket.aqiLow, bucket.aqiHigh, bucket.pmLow, bucket.pmHigh) * 10) / 10;
}

function bucketGradient(kind: 'pm' | 'aqi') {
  const max = kind === 'pm' ? PM_MAX : AQI_MAX;
  const stops: string[] = [];

  breakpoints.forEach((bucket) => {
    const low = ((kind === 'pm' ? bucket.pmLow : bucket.aqiLow) / max) * 100;
    const high = ((kind === 'pm' ? bucket.pmHigh : bucket.aqiHigh) / max) * 100;
    stops.push(`${bucket.color} ${low}%`, `${bucket.color} ${high}%`);
  });

  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

const pmGradient = bucketGradient('pm');
const aqiGradient = bucketGradient('aqi');

export default function AirQualityConverter(): JSX.Element {
  const [pmValue, setPmValue] = useState('9.0');
  const [aqiValue, setAqiValue] = useState(String(pmToAqi(9)));

  const currentPm = clamp(Number.parseFloat(pmValue) || 0, 0, PM_MAX);
  const currentAqi = clamp(Number.parseInt(aqiValue, 10) || 0, 0, AQI_MAX);
  const activeBucket = getBreakpointFromAqi(currentAqi);

  const schema = useMemo(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Air Quality Converter',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: 'https://tacotunesday.com/tools/air-quality-converter',
    description: 'Convert smoke PM2.5 concentration in micrograms per cubic meter to AQI and convert AQI back to PM2.5.',
  }), []);

  function updateFromPm(rawValue: string) {
    setPmValue(rawValue);
    const pm = Number.parseFloat(rawValue);
    if (!Number.isNaN(pm)) {
      setAqiValue(String(pmToAqi(pm)));
    }
  }

  function updateFromAqi(rawValue: string) {
    setAqiValue(rawValue);
    const aqi = Number.parseInt(rawValue, 10);
    if (!Number.isNaN(aqi)) {
      setPmValue(aqiToPm(aqi).toFixed(1));
    }
  }

  return (
    <Layout
      title="Air Quality Converter: PM2.5 µg/m³ to AQI"
      description="Convert smoke PM2.5 concentration in µg/m³ to AQI, or convert AQI back to PM2.5 with color-coded air quality buckets.">
      <Head>
        <meta
          name="keywords"
          content="air quality converter, PM2.5 to AQI, AQI to PM2.5, smoke AQI calculator, wildfire smoke calculator"
        />
        <link rel="canonical" href="https://tacotunesday.com/tools/air-quality-converter" />
        <script type="application/ld+json">{schema}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>Tools</p>
          <Heading as="h1">Air Quality Converter</Heading>
          <p className={styles.subtitle}>
            Convert wildfire smoke PM2.5 concentration in µg/m³ to AQI, or enter an AQI value to see the
            equivalent PM2.5 concentration.
          </p>
        </div>
      </header>

      <main className={styles.converter}>
        <div className="container">
          <section className={styles.card} aria-label="PM2.5 and AQI converter">
            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="pm25-input">Smoke PM2.5 concentration</label>
                  <span className={styles.inputWrap}>
                    <input
                      id="pm25-input"
                      inputMode="decimal"
                      min="0"
                      max={PM_MAX}
                      step="0.1"
                      type="number"
                      value={pmValue}
                      onChange={(event) => updateFromPm(event.target.value)}
                    />
                    <span className={styles.unit}>µg/m³</span>
                  </span>
                </div>
                <input
                  aria-label="Smoke PM2.5 concentration slider"
                  className={styles.range}
                  max={PM_MAX}
                  min="0"
                  step="0.1"
                  style={{'--track-gradient': pmGradient} as React.CSSProperties}
                  type="range"
                  value={currentPm}
                  onChange={(event) => updateFromPm(event.target.value)}
                />
                <div className={styles.ticks} aria-hidden="true">
                  {breakpoints.map((bucket) => (
                    <span className={styles.tick} key={bucket.label}>
                      <span className={styles.swatch} style={{backgroundColor: bucket.color}} />
                      {bucket.pmLow}–{bucket.pmHigh}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="aqi-input">Air Quality Index</label>
                  <span className={styles.inputWrap}>
                    <input
                      id="aqi-input"
                      inputMode="numeric"
                      min="0"
                      max={AQI_MAX}
                      step="1"
                      type="number"
                      value={aqiValue}
                      onChange={(event) => updateFromAqi(event.target.value)}
                    />
                    <span className={styles.unit}>AQI</span>
                  </span>
                </div>
                <input
                  aria-label="AQI slider"
                  className={styles.range}
                  max={AQI_MAX}
                  min="0"
                  step="1"
                  style={{'--track-gradient': aqiGradient} as React.CSSProperties}
                  type="range"
                  value={currentAqi}
                  onChange={(event) => updateFromAqi(event.target.value)}
                />
                <div className={styles.ticks} aria-hidden="true">
                  {breakpoints.map((bucket) => (
                    <span className={styles.tick} key={bucket.label}>
                      <span className={styles.swatch} style={{backgroundColor: bucket.color}} />
                      {bucket.aqiLow}–{bucket.aqiHigh}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={styles.summary}
              style={{
                '--category-color': activeBucket.color,
                color: activeBucket.textColor ?? '#111',
              } as React.CSSProperties}>
              <div>
                <Heading as="h2">Current category: {activeBucket.label}</Heading>
                <p>{activeBucket.description}</p>
              </div>
              <span className={styles.badge}>AQI {currentAqi}</span>
            </div>
          </section>

          <div className={styles.details}>
            <section>
              <Heading as="h2">How this converter works</Heading>
              <p>
                This tool uses EPA PM2.5 AQI breakpoints and linear interpolation within each bucket. Values
                above the listed range are capped at AQI 500, the top of the standard AQI scale.
              </p>
            </section>
            <section>
              <Heading as="h2">PM2.5 AQI buckets</Heading>
              <ul className={styles.bucketList}>
                {breakpoints.map((bucket) => (
                  <li key={bucket.label}>
                    <span className={styles.swatch} style={{backgroundColor: bucket.color}} />
                    <strong>{bucket.label}</strong>: AQI {bucket.aqiLow}–{bucket.aqiHigh}, PM2.5 {bucket.pmLow}–{bucket.pmHigh} µg/m³
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
