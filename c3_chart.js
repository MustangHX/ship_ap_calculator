function update_chart(pen_dict,pltid) {
  xmax0=Math.max(...pen_dict[0].distance);
  xmax1=Math.max(...pen_dict[1].distance);

  xmax=Math.ceil(xmax0/5.)*5;
  xcount=xmax/5+1;
  xtick=[];
  //label_list=['vertical armor','deck armor','fly time'];
  key_list=['armor_vert','armor_hori','fly_time','v_impact']
  ylabel_list=['Penetration of Vertical Armor Belt (mm)','Penetration of Horizontal Deck Armor(mm)','Shell Fly Time (s)','Impact Velocity (m/s)'];
  console.log(pen_dict[0][key_list[pltid]]);
  console.log(key_list[pltid]);

  for (i=0;i<xcount;i++){
    xtick.push(i*5);
  }
  c3.generate({
    bindto: '#chart'+pltid,
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict[0].distance),
        [pen_dict[0].name].concat(pen_dict[0][key_list[pltid]]),
        [pen_dict[1].name].concat(pen_dict[1][key_list[pltid]])

        //['deck armor'].concat(pen_dict.armor_hori),
      //  ['fly time'].concat(pen_dict.fly_time)
      ],
      //type:"spline",
      //style:"dashed"
    axes: {
    [pen_dict[0].name]: 'y',
    [pen_dict[1].name]: 'y'

    //'deck armor': 'y',
    //'fly time':'y2'
  }
    },
    axis: {
      y: {
        label: { // ADD
          text: ylabel_list[pltid],
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
