#!/usr/bin/ruby

require 'json'
require 'webrick'

STDOUT.sync = true

# Initial data setup
STORE_STORES = [
  {id: 1, name: 'ALDO Centre Eaton', address: '705 Rue Sainte-Catherine O, Montreal, QC H3B 4G5, Canada' },
  {id: 2, name: 'ALDO Destiny USA Mall', address: '9090 Destiny USA Dr, Syracuse, NY 13204, USA' },
  {id: 3, name: 'ALDO Pheasant Lane Mall', address: '310 Daniel Webster Hwy, Nashua, NH 03060, USA' },
  {id: 4, name: 'ALDO Holyoke Mall', address: '50 Holyoke St, Holyoke, MA 01040, USA' },
  {id: 5, name: 'ALDO Maine Mall', address: '364 Maine Mall Rd, South Portland, ME 04106, USA' },
  {id: 6, name: 'ALDO Crossgates Mall', address: '1 Crossgates Mall Rd, Albany, NY 12203, USA' },
  {id: 7, name: 'ALDO Burlington Mall', address: '75 Middlesex Turnpike, Burlington, MA 01803, USA' },
  {id: 8, name: 'ALDO Solomon Pond Mall', address: '601 Donald Lynch Blvd, Marlborough, MA 01752, USA' },
  {id: 9, name: 'ALDO Auburn Mall', address: '385 Southbridge St, Auburn, MA 01501, USA' },
  {id: 10, name: 'ALDO Waterloo Premium Outlets', address: '655 NY-318, Waterloo, NY 13165, USA' }
]

SHOES_MODELS = ['ADERI', 'MIRIRA', 'CAELAN', 'BUTAUD', 'SCHOOLER', 'SODANO', 'MCTYRE', 'CADAUDIA', 'RASIEN', 'WUMA', 'GRELIDIEN', 'CADEVEN', 'SEVIDE', 'ELOILLAN', 'BEODA', 'VENDOGNUS', 'ABOEN', 'ALALIWEN', 'GREG', 'BOZZA']
INVENTORY = Array(0..100) 
RANDOMNESS = Array(1..3) 

# Start a WEBrick server
server = WEBrick::HTTPServer.new(Port: 8000)

# Define the /stores endpoint with CORS headers
server.mount_proc '/stores' do |req, res|
  res['Content-Type'] = 'application/json'
  
  # Set the CORS headers
  res['Access-Control-Allow-Origin'] = '*'  # Allow all origins
  res['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  res['Access-Control-Allow-Headers'] = 'Content-Type'
  
  res.body = JSON.generate(STORE_STORES)
end

# Start inventory simulation in a separate thread
Thread.new do
  loop do
    RANDOMNESS.sample.times do
      store = STORE_STORES.sample
      puts JSON.generate({
        store: store[:name],
        model: SHOES_MODELS.sample,
        inventory: INVENTORY.sample,
      }, quirks_mode: true)
    end
    sleep 1
  end
end

# Trap to gracefully shutdown the server
trap 'INT' do
  server.shutdown
end

# Start the server
server.start
