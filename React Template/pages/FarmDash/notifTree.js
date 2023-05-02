import { useState, useEffect } from 'react';
import React from "react";
import Head from "next/head";
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";
import FullLayout from '../../src/layouts/FullLayout';
import AccessDach from '../accessDach';
import Moment from 'moment';

import { MDBIcon } from "mdb-react-ui-kit";
const notifTree = () => {
  const [notifications, setNotifications] = useState([]);
  const [numUnread, setNumUnread] = useState(0);
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    fetch('http://localhost:5000/farms/getTreeN')
      .then(response => response.json())
      .then(data => {setNotifications(data),
      setNumUnread(data.filter((notif) => !notif.isRead).length)})
      .catch(error => console.error(error));
  }, []);

  const deleteNotification = (id) => {
    fetch(`http://localhost:5000/farms/deleteTreeN/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setNotifications(notifications.filter((notif) => notif._id !== id));
    })
    .catch(error => console.error(error));
  }

  const markNotificationAsRead = (id) => {
    fetch(`http://localhost:5000/farms/updateTreeN/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isRead: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setNotifications(notifications.map((notif) => {
        if (notif._id === id) {
          notif.isRead = true;
        }
        return notif;
      }));
      setNumUnread(numUnread - 1);
    })
    .catch(error => console.error(error));
  }
  
  return (
    <>
      {!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
      {connectedUser && (
        <FullLayout>
          <Card>
            <CardBody>
              <Row className="align-items-center justify-content-between">
                <Col>
                  <CardTitle tag="h4">Notifications</CardTitle>
               
                </Col>
               
              </Row>
              {notifications.map(notification => (
  <div className="mt-3" key={notification._id}>
    <Alert color={notification.isRead ? "secondary" : "info"} className="d-flex justify-content-between align-items-center">
      {notification.description}
      <span className="text-muted"><MDBIcon far icon="clock" /> {Moment(notification.createdAt).format('Do MMMM, h:mm a')}</span>
      <div>
    <Button className="btn" outline color="warning" size="sm" onClick={() => deleteNotification(notification._id)}>
          <i className="bi bi-trash3-fill"></i> 
        </Button>
      
        { !notification.isRead  &&     <Button className="btn ml-3" outline color="success" size="sm" onClick={() => markNotificationAsRead(notification._id)}>
          <i className="bi bi-check-circle-fill"></i> 
        </Button>
          } 
      </div>
    </Alert>
  </div>
))}

            </CardBody>
          </Card>
        </FullLayout>
      )}
    </>
  );
}

export default notifTree;
