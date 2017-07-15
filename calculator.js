function calculator(m,D,c_D,v_0,K){
//integration for trajectories
// SHELL CONSTANTS
console.log(m,D,c_D,v_0,K);
C = 0.5561613; // PENETRATION
g = 9.81;// GRAVITY
T_0 = 288.; // TEMPERATURE AT SEA LEVEL
L = 0.0065; // TEMPERATURE LAPSE RATE
p_0 = 101325.;// PRESSURE AT SEA LEVEL
R = 8.31447; // UNIV GAS CONSTANT
M = 0.0289644; // MOLAR MASS OF AIR

// SHELL CONSTANTS #

// m: SHELL Mass
// D: SHELL DIAMETER
// c_D: SHELL DRAG, 0.321 as default,gearing 0.347,cleveland 0.322, Iowa 0.352, Yamato 0.292, S.Caro 0.435,StLous 0.4036
// v_0: SHELL MUZZLE VELOCITY
// K: SHELL KRUPP

if (D <= 0.13){
	norm=10.*Math.PI/180.
} else if (D <= 0.152){
	norm=8.5*Math.PI/180.
} else if( D <= 0.22){
	norm=7.*Math.PI/180.
}else{
	norm=6.*Math.PI/180.
}
cw_1 = 1; //QUADRATIC DRAG COEFFICIENT
cw_2 = 100+1000/3*D; //LINEAR DRAG COEFFICIENT

C_pen = C * K/2400; //KRUPP INCLUSION
k = 0.5 * c_D * (D/2)**2 * Math.PI / m;// CONSTANTS TERMS OF DRAG

n_angle=100
step_angle=30*Math.PI/180./n_angle //ELEV. ANGLES 0-30 deg, at launch
console.log(Math.PI)
var alpha=[];
var armor_abs=[];
var armor_vert=[];
var armor_hori=[];
var distance=[];
for (i=0;i<n_angle;i++){
  alpha.push(i*step_angle);
  armor_abs.push(0.);
  armor_vert.push(0.);
  armor_hori.push(0.);
  distance.push(0.);
}
//console.log(alpha)
dt = 0.1; //TIME STEP
t=0.

for(i=0;i<n_angle;i++){
	v_x = v_0*Math.cos(alpha[i]);
	v_y = v_0*Math.sin(alpha[i]);
	y=0.0
	x=0.0

	while (y>=0.0){
		x=x+dt*v_x
		y=y+dt*v_y

		T=T_0-L*y
		p=p_0*Math.pow(T/T_0,g*M/R/L)
		rho_g=p*M/R/T

		v_x=v_x-dt*k*rho_g*(cw_1*v_x*v_x+cw_2*v_x)
		v_y=v_y-dt*g-dt*k*rho_g*(cw_1*v_y*v_y+cw_2*v_y)

		t+=dt
  }


	v_imp=Math.sqrt(v_x*v_x+v_y*v_y)
	pen_abs=C_pen*Math.pow(v_imp,1.1)*Math.pow(m,0.55)/Math.pow(D*1000,0.65) // weird penetration formula
  //console.log(v_0*Math.sin(alpha[i]),v_imp,pen_abs);

	IA=Math.atan(Math.abs(v_y)/Math.abs(v_x))

	if(IA-norm>0.0){
		IA_vert_armor=IA-norm
  }
	else{
    IA_vert_armor=0.0;
  }

	if(IA+norm<90.0){
		IA_hori_armor=IA+norm
  }else{
	 	IA_hori_armor=90.0;
  }

	armor_abs[i]=pen_abs
	armor_vert[i]=pen_abs*Math.cos(IA_vert_armor)
	armor_hori[i]=pen_abs*Math.sin(IA_hori_armor)

	distance[i]=x
}
var data_dict={};
data_dict.distance=distance;
data_dict.armor_abs=armor_abs;
data_dict.armor_vert=armor_vert;
data_dict.armor_hori=armor_hori;

//console.log(armor_vert);
//pen_curve_abs=interp1d(distance,armor_abs,kind='cubic')
//pen_curve_vert=interp1d(distance,armor_vert,kind='cubic')
//pen_curve_hori=interp1d(distance,armor_hori,kind='cubic')

dist=[5000,10000,15000,20000]
return data_dict;

}
