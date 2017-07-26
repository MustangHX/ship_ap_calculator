function update_chart(pen_dict) {
  xmax0=Math.max(...pen_dict.distance);
  xmax=Math.ceil(xmax0/5.)*5;
  xcount=xmax/5+1;
  xtick=[];
  for (i=0;i<xcount;i++){
    xtick.push(i*5);
  }
  c3.generate({
    bindto: '#chart',
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict.distance),
        ['vertical armor'].concat(pen_dict.armor_vert),
        ['deck armor'].concat(pen_dict.armor_hori),
        ['fly time'].concat(pen_dict.fly_time)
      ],
      //type:"spline",
      //style:"dashed"
    axes: {
    'vertical armor': 'y',
    'deck armor': 'y',
    fly_time:'y2'
  }
    },
    axis: {
      y: {
        label: { // ADD
          text: 'Penetration (mm)',
          position: 'outer-middle'
        }
      },
      y2: {
        //max:30,
        show: true,
        label: { // ADD
          text: 'Shell Fly Time (s)',
          position: 'outer-middle'
        }
      },
      x: {
        max: xmax*1.0,
        min: 0.,
        label: { // ADD
          text: 'Range (km)',
          position: 'outer-center'
        },

        tick: {
              //  fit: true
                format: d3.format('.2f'),
                //count: xcount
                values:xtick

            }
      },
    }
  });
}
