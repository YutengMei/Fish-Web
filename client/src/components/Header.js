import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelineIcon from "@material-ui/icons/Timeline";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import PinDropIcon from "@material-ui/icons/PinDrop";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

class Header extends Component {
  state = { open: false };

  toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "shift")
    ) {
      return;
    }

    this.setState({ open: open });
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a
            href="/auth/google"
            style={{ textDecoration: "none", color: "white" }}
          >
            Login With Google
          </a>
        );
      default:
        return (
          <a
            href="/api/logout"
            style={{ textDecoration: "none", color: "white" }}
          >
            Logout
          </a>
        );
    }
  }

  renderProfile() {
    if (!this.props.auth) {
      return (
        <Grid
          className={this.props.classes.profile}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Avatar
            alt="defaultAvatar"
            className={this.props.classes.large}
            style={{ marginBottom: "9%" }}
          ></Avatar>
          <button class="ui google plus button">
            <i class="google plus icon"></i>
            <a
              href="/auth/google"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login with Google
            </a>
          </button>
        </Grid>
      );
    }
    const userName = this.props.auth.userName;
    return (
      <Grid
        className={this.props.classes.profile}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Avatar
          alt={userName}
          src={this.props.auth.profileImageUrl}
          className={this.props.classes.large}
        ></Avatar>
        <h1>{userName}</h1>
      </Grid>
    );
  }

  renderMainList() {
    return (
      <div
        className={this.props.classes.list}
        role="presentation"
        onClick={this.toggleDrawer(false)}
        onKeyDown={this.toggleDrawer(false)}
      >
        {this.renderProfile()}
        <Divider />
        <List>
          <Link
            to="/fishmap"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button key="Find Spots">
              <ListItemIcon>
                <NotListedLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Find Spots" />
            </ListItem>
          </Link>

          <Link
            to="/tideChart"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button key="Tide Chart">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Tide Chart" />
            </ListItem>
          </Link>

          <ListItem button key="Add Spot" onClick={this.props.handleDialogOpen}>
            <ListItemIcon>
              <PinDropIcon />
            </ListItemIcon>
            <ListItemText primary="Discovered a Spot" />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={this.props.classes.menuButton}
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              className={this.props.classes.title}
            >
              Fish
            </Typography>
            <Button color="inherit">{this.renderContent()}</Button>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          stype={{ width: "0px" }}
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          {this.renderMainList()}
        </SwipeableDrawer>
        <Toolbar />
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  profile: {
    marginTop: "50%",
    marginBottom: "20%"
  }
});

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
