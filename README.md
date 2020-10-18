# d3-luxon

Luxon-based d3-time and d3-scale implementations.


### Example Usage

```javascript
import {scaleZoned} from "d3-luxon";

let scale = scaleZoned(zone, 1 /*firstDayOfWeek; 1=monday, 7=sunday*/)
                .range([0, width])
```