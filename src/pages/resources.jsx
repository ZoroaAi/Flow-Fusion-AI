import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Link from "next/link";
import Router from "next/router";

import '@/styles/resources.scss';

export async function getServerSideProps(context) {
  const { page = 1 } = context.query;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources?page=${page}`);
    const data = await res.json();

    return {
      props: {
        kb: data.kb || [],
        currentPage: data.currentPage,
        totalPages: data.totalPages
      }
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    return {
      props: {
        kb: [],
        currentPage: 1,
        totalPages: 1
      }
    };
  }
}

export default function Resources({ kb, currentPage, totalPages }) {
  const [resources, setResources] = useState(kb || []);
  const [modalVisible, setModalVisible] = useState(false);
  const nextPage = parseInt(currentPage) + 1;
  const prevPage = parseInt(currentPage) - 1;

  const { user } = useAuth();

  // Log initial state of user
  console.log('Initial user state:', user);
  
  useEffect(() => {
    if (user) {
      console.log(`name: ${user.name}, email: ${user.email}`);
    } else {
      console.log('No user is logged in.');
    }

    const fetchResources = async () => {
      try {
        const res = await fetch(`/api/resources?page=${currentPage}`);
        const data = await res.json();
        setResources(data.kb || []);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, [currentPage, user]);
  
  const handleClick = (resource) => {
    const hasAccess = 
      resource.level === "beginner" ||
      resource.level === "intermediate" && user.subscription === "intermediate" ||
      resource.level === "pro" && user.subscription === "pro" ||
      user.purchasedResources && user.purchasedResources.includes(resource.id)
    ;
    
    if(hasAccess){
      window.open(resource.link, '_blank');
    } else {
      setModalVisible(true);
    }
  }

  return (
    <div className="resources-page">
      <div className="resource-list-container">
      {user ? (
        <h1>Welcome back, {user.name}! Here are your resources:</h1>
      ) : (
        <h1>Resources</h1>
      )}
      <ul className="resources-list">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <li key={resource.id} className="resource-item" onClick={() => handleClick(resource)}>
              <div>
                {resource.img && <img src={resource.img} alt={resource.title} className={`resources-image ${resource.level.toLowerCase()}`} />}
                <div className="resource-header">
                  <h2>{resource.title}</h2>
                  <span className={resource.level.toLowerCase()}>{resource.level}</span>
                </div>
                <p>{resource.description}</p>
              </div>
            </li>
          ))
        ) : (
          <li>No Resources Found</li>
        )}
      </ul>
      <div className="pagination">
        {prevPage > 0 && <Link href={`?page=${prevPage}`}><button className="pagination-button">Previous</button></Link>}
        <p>Page: {currentPage} of {totalPages}</p>
        {nextPage <= totalPages && <Link href={`?page=${nextPage}`}><button className="pagination-button">Next</button></Link>}
      </div>
      {modalVisible && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className="close-button" onClick={() => setModalVisible(false)}>X</button>
            <h2>Unlock Exclusive Automation Resources!</h2>
            <p>Discover your full automation potential with our premium resources. By purchasing access, you'll gain invaluable insights into automation use cases and tutorials designed to elevate your productivity and efficiency.</p>
            <p>With our expertly curated content, you'll learn how to streamline workflows, optimize processes, and leverage AI to transform your business operations. Don't miss out on the opportunity to master the tools and techniques that can drive your success.</p>
            <p>Invest in your growth and stay ahead of the curve with FlowFusion AI's comprehensive automation resources. Join a community of innovators and start maximizing your impact today.</p>
            <div className="modal-buttons">
              <button onClick={() => Router.push('/payment')}>Go to Payment</button>
              <button onClick={() => setModalVisible(false)}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
    </div>
  );
}
