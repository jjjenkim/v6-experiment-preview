#!/usr/bin/env python3
import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
# Add current directory to path so we can import modules
sys.path.insert(0, SCRIPT_DIR)

from fis_scraper import FISScraper
from data_processor import DataProcessor

def main():
    print("🚀 Team Korea Data Pipeline (V6 Agent System)")
    print("=============================================")
    
    # 1. Load URLs
    url_file = os.path.join(SCRIPT_DIR, "data", "raw", "athlete_urls.txt")
    if not os.path.exists(url_file):
        print(f"❌ Error: URL file not found at {url_file}")
        return

    with open(url_file, 'r') as f:
        urls = [line.strip() for line in f if line.strip()]
    
    print(f"📋 Found {len(urls)} athlete URLs.")
    
    # 2. Agent A: Scraping
    scraper = FISScraper()
    raw_data = scraper.scrape_all(urls)
    print(f"✓ Agent A finished: {len(raw_data)} profiles collected.")
    
    # 3. Agent B: Processing
    processor = DataProcessor()
    processed_athletes = processor.process(raw_data)
    
    # 4. Save to V6 App
    output_path = os.path.join(APP_ROOT, "src", "data", "athletes.json")
    processor.save_to_app(processed_athletes, output_path)
    
    print("=============================================")
    print("✅ Pipeline Complete. V6 Dashboard Data Updated.")

if __name__ == "__main__":
    main()
