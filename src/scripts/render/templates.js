export const bug = ({ r, g, b}) =>
`<div class="bug">
  <div class="color" style="background: rgb(${r}, ${g}, ${b})"></div>
  <img src="./assets/bug.png" width="40"/>
  <span>(${r},${g},${b})</span>
</div>`;

export const rankItem = ({ r, g, b, fitness }) => 
`<div class="rank-item">
  <div class="bug">
    <div class="color" style="background: rgb(${r}, ${g}, ${b})"></div>
    <img src="./assets/bug.png" width="60"/>
  </div>
  <div class="rank-values">
    <span style="color: rgb(${r}, ${g}, ${b})">color: (${r},${g},${b})</span>
    <span>fitness: ${fitness}</span>
  </div>
</div>`;

export const generationText = (number) => 
`<span class="generation">Generation: ${number}</span>`;