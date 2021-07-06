const images = [
  {
    name: 'mura',
    category: 'landscape',
    make: 'samsung',
    model: 'SM-G950F',
    date_time_original: '2019:07:26 10:57:57',
    gps_altitude: '256.296 m',
    gps_latitude: `46 deg 31' 52.00" N`,
    gps_longitude: `16 deg 22' 46.00" E`,
    secure_url:
      'https://res.cloudinary.com/spankoj/image/upload/v1625211951/s1xmzde0mfmwkquwpazp.jpg',
  },
  {
    name: 'sopron',
    category: 'building',
    make: 'DJI',
    model: 'FC7303',
    date_time_original: '2021:06:24 20:39:49',
    gps_altitude: '256.296 m',
    gps_latitude: '47 deg 40\' 38.33" N',
    gps_longitude: '16 deg 36\' 16.40" E',
    secure_url:
      'https://res.cloudinary.com/spankoj/image/upload/v1625211853/el13fpuffgowboitpeda.jpg',
  },
  {
    name: 'amphitheatre',
    category: 'landscape',
    make: 'DJI',
    model: 'FC7303',
    date_time_original: '2021:06:28 18:00:59',
    gps_altitude: '343.687 m',
    gps_latitude: '48 deg 6\' 37.40" N',
    gps_longitude: '16 deg 51\' 8.28" E',
    secure_url:
      'https://res.cloudinary.com/spankoj/image/upload/v1625211760/jiluggwarypfl2d2yeys.jpg',
  },
  {
    name: 'sonnensee',
    category: 'landscape',
    make: 'DJI',
    model: 'FC7303',
    date_time_original: '2021:06:28 10:32:54',
    gps_altitude: '460.464 m',
    gps_latitude: '47 deg 37\' 41.46" N',
    gps_longitude: '16 deg 28\' 12.45" E',
    secure_url:
      'https://res.cloudinary.com/spankoj/image/upload/v1625476236/drkwlwhfsr7dpoivbdqu.jpg',
  },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO images ${sql(
    images,
    'name',
    'category',
    'make',
    'model',
    'date_time_original',
    'gps_altitude',
    'gps_latitude',
    'gps_longitude',
    'secure_url',
  )}
 `;
};

exports.down = async function down(sql) {
  for (const image of images) {
    await sql`
		DELETE FROM
			images
		WHERE
			name = ${image.name}
      AND
			date_time_original = ${image.date_time_original}
		`;
  }
};
