import "../flow/config";
import * as fcl from "@onflow/fcl";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";


// Events are identified using a specific syntax defined by Flow
// A.{contractAddress}.{contractName}.{eventName}


// ListingAvailable and ListingCompleted are event identifiers for NFTStorefront V1 on mainnet 
const ListingAvailableEventKey = "A.4eb8a10cb9f87357.NFTStorefront.ListingAvailable";
const ListingCompletedEventKey = "A.4eb8a10cb9f87357.NFTStorefront.ListingCompleted";

export default function Home() {
  // define stat variables to track the two events
  const [availableEvents, setAvailableEvents] = useState([]);
  const [completedEvents, setCompleteEvents] = useState([]);

  // When the page is first loaded subscibe (listen for) new events
  useEffect(() => {
    // listen for ListingAvailable events
    // add any new events to the front of the state variable array 
    // New events ono top, old events on bottom
    fcl.events(ListingAvailableEventKey).subscribe(events => {
      setAvailableEvents(oldEvents => [events, ...oldEvents])
    })
    // Listen for ListingCompleted Events
    fcl.events(ListingCompletedEventKey).subscribe(events => {
      setCompleteEvents(oldEvents => [events, ...oldEvents])
    })

  }, [])

  return (
    <div className={styles.main}>
      <div>
        <h2>ListingAvailable</h2>
        {availableEvents.length === 0
        ? "No ListingAvailable events tracked yet"
        : availableEvents.map((ae, idx) => (
          <div key={idx} className={styles.info}>
            <p>Storefront: {ae.storefrontAddress}</p>
            <p>Listing Resource Id: {ae.listingResourceID}</p>
            <p>NFT Type: {ae.nftType.typeId}</p>
            <p>NFT ID: {ae.nftID}</p>
            <p>Token Type: {ae.ftVaultType.typeID}</p>
            <p>Price: {ae.price}</p>
          </div>
        ))}
      </div>

    <div>
      <h2>ListingCompleted</h2>
      {completedEvents.length === 0
        ? "No ListingCompleted events tracked"
        : completedEvents.map((ce, idx) => (
          <div key={idx} className={styles.info}>
            <p>Storefront Resource ID: {ce.storefrontResourceID}</p>
            <p>Listing Resource ID: {ce.listingResourceID}</p>
            <p>NFT Type: {ce.nftType.typeID}</p>
            <p>NFT ID: {ce.nftID}</p>
          </div>
        ))
      }

    </div>
  </div>
  )

}