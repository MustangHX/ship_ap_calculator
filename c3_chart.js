function update_chart(pen_dict,pltid) {
  xmax0=Math.max(...pen_dict[0].distance);
  xmax1=Math.max(...pen_dict[1].distance);

  xmax=Math.ceil(xmax0/5.)*5;
  xcount=xmax/5+1;
  xtick=[];
  //label_list=['vertical armor','deck armor','fly time'];
  key_list=['armor_vert','armor_hori','fly_time','v_impact'];
  ylabel_list=['Penetration of Vertical Armor Belt (mm)','Penetration of Horizontal Deck Armor(mm)','Shell Fly Time (s)','Impact Velocity (m/s)'];
  key2_list=['impact_angle','impact_angle2'];
  console.log(pen_dict[0].impact_angle);
  console.log(pen_dict[0].impact_angle2);

  for (i=0;i<xcount;i++){
    xtick.push(i*5);
  }
  if (pltid<2){
  c3.generate({
    bindto: '#chart'+pltid,
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict[0].distance),
        [pen_dict[0].name].concat(pen_dict[0][key_list[pltid]]),
        [pen_dict[1].name].concat(pen_dict[1][key_list[pltid]]),
        [pen_dict[0].name+'_impact_angle'].concat(pen_dict[0][key2_list[pltid]]),
        [pen_dict[1].name+'_impact_angle'].concat(pen_dict[1][key2_list[pltid]]),
        //['deck armor'].concat(pen_dict.armor_hori),
      //  ['fly time'].concat(pen_dict.fly_time)
      ],



      //type:"spline",
      //style:"dashed"
    axes: {
    [pen_dict[0].name]: 'y',
    [pen_dict[1].name]: 'y',
    [pen_dict[0].name+'_impact_angle']: 'y2',
    [pen_dict[1].name+'_impact_angle']: 'y2',

    }

    //'deck armor': 'y',
    //'fly time':'y2'
    },
    axis: {
      y: {
        label: { // ADD
          text: ylabel_list[pltid],
          position: 'outer-middle'
        }
      },

        y2: {
          show: true,
          label: { // ADD
            text: "impact angle",
            position: 'outer-middle',
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
    },
    grid: {
        y: {
            lines: [
                {value: pen_dict[0].rico0, text: pen_dict[0].name+' Starts Ricochet',axis: 'y2',position:'start'},
                {value: pen_dict[0].rico1, text: pen_dict[0].name+' Always Ricochet', axis: 'y2',position:'start'},
                {value: pen_dict[1].rico0, text: pen_dict[1].name+' Starts Ricochet',axis: 'y2'},
                {value: pen_dict[1].rico1, text: pen_dict[1].name+' Always Ricochet', axis: 'y2'}
            ]
        }
    }
  });
}
else  {
  c3.generate({
    bindto: '#chart'+pltid,
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict[0].distance),
        [pen_dict[0].name].concat(pen_dict[0][key_list[pltid]]),
        [pen_dict[1].name].concat(pen_dict[1][key_list[pltid]]),
        //['deck armor'].concat(pen_dict.armor_hori),
      //  ['fly time'].concat(pen_dict.fly_time)
      ],



      //type:"spline",
      //style:"dashed"
    axes: {
    [pen_dict[0].name]: 'y',
    [pen_dict[1].name]: 'y',

    }

    //'deck armor': 'y',
    //'fly time':'y2'
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
}
