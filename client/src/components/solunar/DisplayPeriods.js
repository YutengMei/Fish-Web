import React from 'react';

const DisplayPeriods = ({ solunar }) => {
  console.log("DisplayPeriods", solunar)
  let date = `${solunar.date}`;
  date = (solunar) ? date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,9) : '';
  //const date = solunar.date.slice(0,4) + '-' + solunar.date.slice(4,6) + '-' + solunar.date.slice(6,9);
  //console.log("DisplayPeriods", solunar);
  return (
    <table class="ui celled table">
  <thead>
    <tr><th>Best Time to Fish on {date}</th>
    <th>Start</th>
    <th>End</th>
  </tr></thead>
  <tbody>
    <tr>
      <td data-label="Best Time to Fish on {date}">Best Time Period</td>
      <td data-label="Start">{solunar.solunarData.major1Start}</td>
      <td data-label="End">{solunar.solunarData.major1Stop}</td>
    </tr>
    <tr>
      <td data-label="Best Time to Fish on {date}">2nd Best Time Period</td>
      <td data-label="Start">{solunar.solunarData.major2Start}</td>
      <td data-label="End">{solunar.solunarData.major2Stop}</td>
    </tr>
    <tr>
      <td data-label="Best Time to Fish on {date}">3rd Best Time Period</td>
      <td data-label="Start">{solunar.solunarData.minor1Start}</td>
      <td data-label="End">{solunar.solunarData.minor1Stop}</td>
    </tr>
    <tr>
      <td data-label="Best Time to Fish on {date}">4th Best Time Period</td>
      <td data-label="Start">{solunar.solunarData.minor2Start}</td>
      <td data-label="End">{solunar.solunarData.minor2Stop}</td>
    </tr>
  </tbody>
</table>
  );
}

export default DisplayPeriods;
