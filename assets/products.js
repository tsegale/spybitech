/* ============================================================
   SPYBITECH PRODUCT CATALOGUE
   Selected lines from the TanDelta distribution pricelist (Oct 2026).
   Prices are quoted per order, so no prices are published here.

   Editing: add, remove or reorder objects in SPY_PRODUCTS.
   - cat   : one of the keys in SPY_CATEGORIES
   - tags  : used by the product rails on service pages (data-tags="...")
   - img   : product photo URL (or a local path such as assets/products/x.png)
   - fit   : "contain" for cut-out product shots, "cover" for photos
   - zoom  : optional scale for cut-outs with a lot of white space
   - kit   : optional second image, shown layered for bundles
   Run tools/fetch-product-images.js once to save every photo locally.
   ============================================================ */

window.SPY_CATEGORIES = {
  cctv:       { label: 'CCTV Cameras',        short: 'Cameras',     icon: 'ic-camera' },
  recorders:  { label: 'Recorders & Kits',    short: 'Recorders',   icon: 'ic-server' },
  alarms:     { label: 'Alarms & Intercom',   short: 'Alarms',      icon: 'ic-shield' },
  smarthome:  { label: 'EZVIZ Smart Home',    short: 'Smart Home',  icon: 'ic-home' },
  networking: { label: 'Switches & Routers',  short: 'Networking',  icon: 'ic-switch' },
  wifi:       { label: 'Wi-Fi & Mesh',        short: 'Wi-Fi',       icon: 'ic-wifi' },
  cabling:    { label: 'Cabling & Racks',     short: 'Cabling',     icon: 'ic-cable' },
  power:      { label: 'Solar & Power',       short: 'Power',       icon: 'ic-bolt' }
};

(function () {
  var HIK = 'https://assets.hikvision.com/prd/';
  var TP  = 'https://static.tp-link.com/';
  var EZ  = 'https://mfs.ezvizlife.com/';
  var PX  = function (id) { return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=800'; };

  window.SPY_PRODUCTS = [
    /* ---------------- CCTV CAMERAS ---------------- */
    {
      id: 'hik-1047g3', cat: 'cctv', brand: 'Hikvision', badge: 'Best seller',
      name: '4MP ColorVu 3.0 Bullet Camera',
      sku: 'DS-2CD1047G3-LIU',
      tags: ['cameras', 'colorvu', 'ip', 'featured'],
      img: HIK + 'normal/all/image/m000172317/main_mainview/DS-2CD10x7G2H-LIUF-筒机39-全彩双光-海康白-基线-左侧.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Full-colour images at night, with Smart Hybrid Light that switches to white light only when someone is in frame.',
      specs: ['4MP resolution', 'Smart Hybrid Light up to 30 m', 'Built-in microphone', 'PoE powered, IP67 outdoor rated']
    },
    {
      id: 'hik-1347g2h', cat: 'cctv', brand: 'Hikvision',
      name: '4MP ColorVu Turret Camera',
      sku: 'DS-2CD1347G2H-LIU',
      tags: ['cameras', 'colorvu', 'ip', 'featured'],
      img: HIK + 'normal/all/image/m000108245/海螺51B-双光-基线-海康白-全彩-海外-右侧.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'A compact turret for entrances, reception areas and shop floors, with human and vehicle detection.',
      specs: ['4MP, 2.8 mm wide lens', 'Human and vehicle detection', 'Smart Hybrid Light', 'Built-in microphone']
    },
    {
      id: 'hik-1147g3', cat: 'cctv', brand: 'Hikvision',
      name: '4MP ColorVu 3.0 Dome Camera',
      sku: 'DS-2CD1147G3-LIU',
      tags: ['cameras', 'colorvu', 'ip'],
      img: HIK + 'normal/all/image/m000172318/双光半球61---基线---左侧-1.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'A discreet dome for ceilings and covered walkways that still records in colour after dark.',
      specs: ['4MP resolution', 'Smart Hybrid Light up to 30 m', 'Built-in audio', 'Indoor and covered outdoor use']
    },
    {
      id: 'hik-2ce16k0t', cat: 'cctv', brand: 'Hikvision', badge: 'Deterrent',
      name: '3K Turbo HD Bullet with Siren and Two-Way Audio',
      sku: 'DS-2CE16K0T-LXTS',
      tags: ['cameras', 'analogue', 'featured'],
      img: HIK + 'normal/all/image/m000147051/模拟筒机39.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'An analogue upgrade for existing DVR sites: it can talk back, sound a siren and flash a strobe at intruders.',
      specs: ['3K Turbo HD over coax', 'Two-way audio', 'Siren and strobe deterrence', 'Up to 20 m white light, 30 m IR']
    },
    {
      id: 'hik-cfsp4', cat: 'cctv', brand: 'Hikvision', badge: 'No power needed',
      name: '4MP Solar 4G Pan and Tilt Camera',
      sku: 'DS-2CFSP4/4G',
      tags: ['cameras', 'solar', '4g', 'featured'],
      img: HIK + 'normal/all/image/m000158571/main_mainview/PT24-AOV套装-基线-海康白-左侧1.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Runs on its own solar panel and a 4G SIM, so farms, gates and building sites can be watched without cables.',
      specs: ['4MP pan and tilt', 'Integrated solar panel and battery', '4G SIM connectivity', 'View from the Hik-Connect app']
    },
    {
      id: 'hik-2de5425', cat: 'cctv', brand: 'Hikvision',
      name: '4MP 25x DarkFighter PTZ Camera',
      sku: 'DS-2DE5425IWG1-E',
      tags: ['cameras', 'ptz'],
      img: HIK + 'normal/all/image/m000077300/main_mainview/DS-2DE6C223,423,232-IW-DGLT-国内标配-S6-红外球10-4G-前脸加热-正视图.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Pan, tilt and zoom across a whole yard or parking area from a single mounting point.',
      specs: ['4MP, 25x optical zoom', 'IR range up to 150 m', 'Wall bracket included', 'Outdoor rated']
    },

    /* ---------------- RECORDERS & KITS ---------------- */
    {
      id: 'hik-kit4', cat: 'recorders', brand: 'Hikvision', badge: 'Complete kit',
      name: 'ColorVu 4-Camera DVR Kit',
      sku: 'DS-J142I/E04HGHI-XD+4CAM',
      tags: ['kits', 'recorders', 'featured'],
      img: HIK + 'normal/all/image/m000058566/MB-238-P.png.thumb.1280.1280.png', fit: 'contain',
      kit: HIK + 'normal/all/image/m000147051/模拟筒机39.png.thumb.1280.1280.png',
      blurb: 'Everything a home or small shop needs in one box: a 4-channel recorder and four colour night vision cameras.',
      specs: ['4-channel H.265 DVR', '2 bullet and 2 turret cameras', '1080p Smart Hybrid Light', 'Installed and configured by us']
    },
    {
      id: 'hik-kit8', cat: 'recorders', brand: 'Hikvision', badge: 'Complete kit',
      name: 'ColorVu 6-Camera, 8-Channel DVR Kit',
      sku: 'DS-J142I/E08HGHI-XB+6CAM',
      tags: ['kits', 'recorders'],
      img: HIK + 'normal/all/image/m000058566/MB-238-P.png.thumb.1280.1280.png', fit: 'contain',
      kit: HIK + 'normal/all/image/m000108245/海螺51B-双光-基线-海康白-全彩-海外-右侧.png.thumb.1280.1280.png',
      blurb: 'Six cameras on an eight-channel recorder, leaving two channels free for the next phase.',
      specs: ['8-channel DVR', '3 bullet and 3 turret cameras', '1080p Smart Hybrid Light', 'Room to add two more cameras']
    },
    {
      id: 'hik-7604nxi', cat: 'recorders', brand: 'Hikvision',
      name: '4-Channel AcuSense PoE NVR',
      sku: 'DS-7604NXI-K1/4P',
      tags: ['recorders', 'nvr', 'storage'],
      img: HIK + 'normal/all/image/m000058880/MB-280-P.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Powers and records up to four IP cameras over single network cables, with AcuSense false alarm filtering.',
      specs: ['4 PoE ports built in', '4K HDMI output', '1 SATA bay for surveillance storage', 'AcuSense human and vehicle filter']
    },
    {
      id: 'hik-7608nxi', cat: 'recorders', brand: 'Hikvision',
      name: '8-Channel AcuSense PoE NVR',
      sku: 'DS-7608NXI-K2/8P',
      tags: ['recorders', 'nvr', 'storage'],
      img: HIK + 'normal/all/image/m000148403/main_mainview/MB-343-RP.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'The workhorse recorder for offices and retail, with two drive bays for longer retention.',
      specs: ['8 PoE ports built in', '2 SATA bays', '4K HDMI output', 'Remote viewing on Hik-Connect']
    },
    {
      id: 'hik-7204hghi', cat: 'recorders', brand: 'Hikvision',
      name: '4-Channel Turbo HD DVR',
      sku: 'DS-7204HGHI-M1',
      tags: ['recorders', 'dvr', 'analogue'],
      img: HIK + 'normal/all/image/m000058566/MB-238-P.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Keeps existing coax cabling in service while adding modern motion detection.',
      specs: ['4 analogue channels', 'Motion Detection 2.0', 'H.265 compression', '1 SATA bay']
    },

    /* ---------------- ALARMS & INTERCOM ---------------- */
    {
      id: 'hik-axpro', cat: 'alarms', brand: 'Hikvision', badge: 'Wireless',
      name: 'AX PRO Wireless Alarm Panel',
      sku: 'DS-PWA96-M2-WE',
      tags: ['alarms', 'featured'],
      img: HIK + 'public/all/image/m000052445/%E5%A4%9A%E8%B7%AFTransmitter-%E6%AD%A3%E9%9D%A2.png.thumb.1280.1280.png', fit: 'contain', zoom: 0.9,
      blurb: 'A wireless alarm that arms, disarms and alerts from your phone, and links to your Hikvision cameras.',
      specs: ['Up to 96 wireless zones', 'Wi-Fi and LAN', '868 MHz Tri-X wireless', 'Hik-Connect app control']
    },
    {
      id: 'hik-pir', cat: 'alarms', brand: 'Hikvision',
      name: 'AX PRO Wireless PIR Detector',
      sku: 'DS-PDP15P-EG2-WE',
      tags: ['alarms'],
      img: HIK + 'normal/all/image/m000109201/PIR探测器-正视图.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'Battery powered motion detector for the AX PRO system, with pet immunity so the dog does not set it off.',
      specs: ['15 m detection range', 'Pet immunity up to 30 kg', 'Battery powered', 'No wiring required']
    },
    {
      id: 'hik-kis602', cat: 'alarms', brand: 'Hikvision',
      name: 'IP Video Intercom Kit',
      sku: 'DS-KIS602',
      tags: ['alarms', 'intercom'],
      img: HIK + 'public/all/image/m000007934/%E5%A4%96%E8%A7%82%E5%9B%BE.png.thumb.1280.1280.png', fit: 'contain',
      blurb: 'See and speak to visitors at the gate from an indoor screen or your phone.',
      specs: ['Door station with camera', 'Indoor video monitor', 'Answer calls on your phone', 'Villa and house installs']
    },

    /* ---------------- EZVIZ SMART HOME ---------------- */
    {
      id: 'ez-h8c', cat: 'smarthome', brand: 'EZVIZ',
      name: 'H8c Outdoor Pan and Tilt Wi-Fi Camera',
      sku: 'CS-H8C (3MP)',
      tags: ['smarthome', 'cameras', 'featured'],
      img: EZ + '198c74d09cc8b089767366a34f5d8152.jpg', fit: 'contain', zoom: 1.5,
      blurb: 'Turns to follow movement around the yard and lets you talk through it from the app.',
      specs: ['3MP pan and tilt', 'Colour night vision', 'AI human detection and tracking', 'Two-way talk']
    },
    {
      id: 'ez-h6c', cat: 'smarthome', brand: 'EZVIZ',
      name: 'H6c Pan and Tilt Indoor Camera',
      sku: 'CS-H6C (1080p)',
      tags: ['smarthome', 'cameras'],
      img: EZ + '440cecf7c6f38e94c6827ab67a4e464b.jpg', fit: 'contain', zoom: 1.5,
      blurb: 'An easy indoor camera for homes and small offices, set up from your phone in minutes.',
      specs: ['1080p resolution', 'Pan and tilt coverage', 'Two-way talk', 'MicroSD or cloud recording']
    },
    {
      id: 'ez-h3', cat: 'smarthome', brand: 'EZVIZ',
      name: 'H3 Outdoor Smart Wi-Fi Camera',
      sku: 'CS-H3 (3MP)',
      tags: ['smarthome', 'cameras'],
      img: EZ + 'a4368ca4318b6cd5b7b3fe0fb0da23e3.jpg', fit: 'contain', zoom: 1.5,
      blurb: 'A weatherproof Wi-Fi camera that records in colour at night and recognises people.',
      specs: ['3MP, 2.8 mm lens', 'Colour night vision', 'AI human shape detection', 'IP67 weatherproof']
    },

    /* ---------------- SWITCHES & ROUTERS ---------------- */
    {
      id: 'tenda-sg108', cat: 'networking', brand: 'Tenda', badge: 'In our office package',
      name: '8-Port Gigabit Desktop Switch',
      sku: 'SG108',
      tags: ['switches', 'package', 'featured'],
      img: 'https://static.tenda.com.cn/tdeweb/UserFiles/Info/image/20240517/20240517163013_4973.png', fit: 'contain', zoom: 1.6,
      blurb: 'The switch we install in our small office network package: quiet, fanless and plug and play.',
      specs: ['8 gigabit ports', 'Plug and play', 'Fanless, silent operation', 'Compact desktop design']
    },
    {
      id: 'tl-sg1008p', cat: 'networking', brand: 'TP-Link',
      name: '8-Port Gigabit PoE Switch',
      sku: 'TL-SG1008P',
      tags: ['switches', 'poe', 'featured'],
      img: TP + 'TL-SG1008P_UN_3.0_01_1499779075717c.jpg', fit: 'contain', zoom: 1.15,
      blurb: 'Powers IP cameras, phones and access points over the network cable, so no extra power points are needed.',
      specs: ['8 gigabit ports', '4 PoE ports', 'Metal casing', 'Ideal for CCTV and Wi-Fi']
    },
    {
      id: 'tl-er605', cat: 'networking', brand: 'TP-Link',
      name: 'Omada ER605 Multi-WAN VPN Router',
      sku: 'ER605',
      tags: ['routers', 'firewalls', 'featured'],
      img: TP + 'ER605_UN_1.0_01_large_1609983075737k.jpg', fit: 'contain',
      blurb: 'Combines two internet lines for failover, and links branches with secure VPN tunnels.',
      specs: ['Up to 4 WAN ports', 'Load balancing and failover', 'IPsec and OpenVPN', 'Omada cloud management']
    },
    {
      id: 'ucg-ultra', cat: 'networking', brand: 'Ubiquiti',
      name: 'UniFi Cloud Gateway Ultra',
      sku: 'UCG-Ultra',
      tags: ['routers', 'firewalls'],
      img: 'https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/2e179331-f85a-4bc9-bf3e-d00192522732.png', fit: 'contain', zoom: 1.35,
      blurb: 'A compact gateway with the UniFi controller built in, for offices that want one dashboard for everything.',
      specs: ['Multi-WAN gateway', 'Built-in UniFi controller', 'Firewall and VPN', 'Manage from web or app']
    },
    {
      id: 'hap-ac2', cat: 'networking', brand: 'MikroTik',
      name: 'hAP ac2 Dual-Band Router',
      sku: 'RBD52G-5HACD2HND-TC',
      tags: ['routers'],
      img: 'https://cdn.mikrotik.com/web-assets/rb_images/1468_lg.webp', fit: 'contain',
      blurb: 'A RouterOS router for businesses that need proper firewall rules and bandwidth control.',
      specs: ['5 gigabit ports', 'Dual-band Wi-Fi', 'RouterOS licence included', 'Firewall, VPN and QoS']
    },
    {
      id: 'mr600', cat: 'networking', brand: 'TP-Link',
      name: 'Archer MR600 4G+ Router',
      sku: 'Archer MR600',
      tags: ['routers', '4g', 'connectivity'],
      img: TP + 'Archer-MR600_EU_1.0_01_large_1555490401807r.jpg', fit: 'contain',
      blurb: 'Insert a SIM and share 4G internet over Wi-Fi, ideal where fibre has not arrived yet.',
      specs: ['4G+ Cat6 SIM slot', 'AC1200 dual-band Wi-Fi', 'Gigabit LAN ports', 'External antennas']
    },

    /* ---------------- WI-FI & MESH ---------------- */
    {
      id: 'tl-eap610', cat: 'wifi', brand: 'TP-Link', badge: 'Wi-Fi 6',
      name: 'Omada AX1800 Wi-Fi 6 Ceiling Access Point',
      sku: 'EAP610',
      tags: ['wifi', 'connectivity', 'featured'],
      img: TP + 'upload/image-line/EAP613_UN_2.0_overview_01_large_20250902082823e.jpg', fit: 'contain',
      blurb: 'Ceiling-mounted Wi-Fi that covers open-plan offices, classrooms and guesthouses evenly.',
      specs: ['Wi-Fi 6, AX1800 dual-band', 'PoE powered', 'Seamless roaming', 'Omada cloud management']
    },
    {
      id: 'u7-lite', cat: 'wifi', brand: 'Ubiquiti', badge: 'Wi-Fi 7',
      name: 'UniFi U7 Lite Access Point',
      sku: 'U7-Lite',
      tags: ['wifi', 'connectivity'],
      img: 'https://cdn.ecomm.ui.com/products/253cc208-4b09-4b2e-9d1a-7aa1e8f93507/49241c96-878f-4e40-8541-c2e89c1c5e6e.png', fit: 'contain',
      blurb: 'Compact Wi-Fi 7 access point with a 2.5 GbE uplink, managed from the UniFi app.',
      specs: ['Wi-Fi 7 dual-band', '2.5 GbE uplink', 'PoE powered', 'UniFi managed']
    },
    {
      id: 'deco-m4', cat: 'wifi', brand: 'TP-Link',
      name: 'Deco M4 Whole-Home Mesh Wi-Fi (3-Pack)',
      sku: 'Deco M4 (3-pack)',
      tags: ['wifi', 'connectivity', 'home'],
      img: TP + 'Deco_M4_01_large_1541464898544r.jpg', fit: 'contain',
      blurb: 'Three units that work as one network, so Wi-Fi reaches the back rooms of a house or small office.',
      specs: ['AC1200 dual-band mesh', 'Up to 100 devices', 'One network name', 'Set up with the Deco app']
    },

    /* ---------------- CABLING & RACKS ---------------- */
    {
      id: 'cat6-cca-100', cat: 'cabling', brand: 'UltraLAN', badge: 'In our office package',
      name: 'CAT6 UTP Solid LAN Cable, 100 m',
      sku: 'CAB-UTP6CCA-100I',
      tags: ['cabling', 'package'],
      img: PX(5480781), fit: 'cover',
      blurb: 'Grey CAT6 solid cable for in-wall and trunking runs, the cable we use in our office package.',
      specs: ['CAT6 UTP, solid core', '100 m roll', 'Grey PVC jacket', 'Gigabit rated']
    },
    {
      id: 'cat6-bc-305', cat: 'cabling', brand: 'UltraLAN',
      name: 'CAT6 Bare Copper LAN Cable, 305 m Box',
      sku: 'CAB-UTP6BC-305I',
      tags: ['cabling'],
      img: PX(5073493), fit: 'cover',
      blurb: 'Pure copper CAT6 for larger installs and PoE camera runs where voltage drop matters.',
      specs: ['CAT6 UTP, bare copper', '305 m pull box', 'Better PoE performance', 'Tested and certified on install']
    },
    {
      id: 'patch-24', cat: 'cabling', brand: 'UltraLAN',
      name: 'CAT6 24-Port Patch Panel',
      sku: 'CAB-PPC624',
      tags: ['cabling', 'racks'],
      img: PX(4330787), fit: 'cover',
      blurb: 'Terminates every cable run neatly in the cabinet, labelled so each port can be traced.',
      specs: ['24 CAT6 ports', '19 inch, 1U', 'Rear cable management', 'Labelled on install']
    },
    {
      id: 'faceplate', cat: 'cabling', brand: 'UltraLAN', badge: 'In our office package',
      name: 'RJ45 Faceplate and Keystone Jack',
      sku: 'CAB-KSFP115X70-1 / CAB-KJC690',
      tags: ['cabling', 'package'],
      img: PX(2425567), fit: 'cover',
      blurb: 'The wall point your desks plug into, finished flush on the wall or in trunking.',
      specs: ['Single or double port', 'CAT6 keystone jack', 'Flush or surface mount', 'Labelled per point']
    },
    {
      id: 'wall-6u', cat: 'cabling', brand: 'UltraLAN', badge: 'In our office package',
      name: '6U Wall-Mount Server Cabinet',
      sku: 'CAB-C-64506WMF',
      tags: ['racks', 'package', 'cabling'],
      img: PX(6466141), fit: 'cover',
      blurb: 'Lockable wall cabinet for the switch, patch panel and router in a small office.',
      specs: ['6U, 19 inch', 'Lockable front door', 'Wall mounted', 'Room for switch and patch panel']
    },
    {
      id: 'rack-42u', cat: 'cabling', brand: 'UltraLAN',
      name: '42U Free-Standing Server Cabinet',
      sku: 'CAB-C-61042FSU',
      tags: ['racks', 'servers'],
      img: PX(5408005), fit: 'cover',
      blurb: 'Full-height cabinet for server rooms, with depth for rack servers and UPS units.',
      specs: ['42U, 19 inch', '1 m deep', 'Free standing', 'Vented, lockable doors']
    },
    {
      id: 'fibre', cat: 'cabling', brand: 'Various',
      name: 'Fibre Patch Leads and Media Converters',
      sku: 'Fibre range',
      tags: ['cabling', 'fibre'],
      img: PX(4682189), fit: 'cover',
      blurb: 'Single-mode and multi-mode leads, pigtails and converters for building-to-building links.',
      specs: ['Single and multi-mode', 'SC and LC connectors', 'Copper to fibre converters', 'Spliced and tested on site']
    },

    /* ---------------- SOLAR & POWER ---------------- */
    {
      id: 'victron-mppt', cat: 'power', brand: 'Victron Energy',
      name: 'SmartSolar MPPT 75/15 Charge Controller',
      sku: 'SmartSolar MPPT 75/15',
      tags: ['power', 'solar'],
      img: 'https://www.victronenergy.com/upload/products/smartsolar%20MPPT%2075%2015.png', fit: 'contain',
      blurb: 'Charges the battery from a solar panel to keep cameras, routers and gate equipment running.',
      specs: ['12/24 V, 15 A', 'Bluetooth monitoring', 'MPPT efficiency', 'For CCTV and network backup']
    },
    {
      id: 'pv-330', cat: 'power', brand: 'Various',
      name: '330W Solar Panel, 72 Cell',
      sku: 'PV-330',
      tags: ['power', 'solar'],
      img: PX(356049), fit: 'cover',
      blurb: 'Powers remote cameras and network gear where there is no reliable mains supply.',
      specs: ['330 W output', '72 cell panel', 'Mounting brackets available', 'Pairs with MPPT controllers']
    }
  ];
})();
