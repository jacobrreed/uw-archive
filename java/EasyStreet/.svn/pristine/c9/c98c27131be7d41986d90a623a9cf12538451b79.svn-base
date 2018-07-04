/*
 * TCSS 305 - Easy Street
 */

package model;

import java.util.ArrayList;
import java.util.Map;



/**
 * 
 * Parent class for all vehicles.
 * @author Jacob Reed
 * @version Apr 14, 2017
 *
 */

abstract class AbstractVehicle implements Vehicle {
    /** Is vehicle alive or not? */
    protected boolean myAlive;
    /** Pokes for revival. */
    protected int myPokes;
    /** Direction. */
    protected Direction myDirection;
    /** Previous Direction. */
    protected Direction myPrevDir;
    /** X value. */
    protected int myX;
    /** Y value. */
    protected int myY;
    /** Origin X. */
    protected int myOriginX;
    /** Origin Y. */
    protected int myOriginY;
    /** Death timer. */
    protected int myDeathTimer;
    /** Origin Direction. */
    protected Direction myOriginDirection;
    /** List that holds terrain which vehicle can pass. */
    protected ArrayList<Terrain> myTerrain;

    
    
    /**
     * Constructor. Prevents instantiation.
     * @param theX X coordinate.
     * @param theY Y coordinate.
     * @param theDir Direction.
     */
    protected AbstractVehicle(final int theX, final int theY,
                              final Direction theDir) {
        myDirection = theDir;
        setY(theY);
        setX(theX);   
        myOriginX = theX; //for reset
        myOriginY = theY; //for reset
        myOriginDirection = theDir; //for reset
        myAlive = true;
    }
    
    @Override
    //To be implemented by children
    public abstract boolean canPass(Terrain theTerrain, Light theLight);

    
    @Override
    //To be implemented by children
    public abstract Direction chooseDirection(Map<Direction, Terrain> theNeighbors);

    @Override
    public void collide(final Vehicle theOther) {
        if (this.getDeathTime() > theOther.getDeathTime()) {
            /* If this vehicles death timer is less
             * than the other vehicles death timer
             * then this vehicle dies.
             */
            this.myAlive = false;
        } else {
            /*Else, stay alive
             * this is a redundant else but ensures
             * the vehicles definitely stays alive.
             */
            this.myAlive = true;
        }
    }
    
    @Override
    public int getDeathTime() {
        return myDeathTimer;
    }

    @Override
    public String getImageFileName() {
        final StringBuffer result = new StringBuffer();
        result.append(this.getClass().getSimpleName().toLowerCase());
        if (myAlive) {
            result.append(".gif");
        } else {
            result.append("_dead.gif");
        }
        return result.toString();
    }

    @Override
    public Direction getDirection() {
        return myDirection;
    }

    @Override
    public void reset() {
        setX(myOriginX);
        setY(myOriginY);
        setDirection(myOriginDirection);
        myAlive = true;
    }
    
    @Override
    public void setDirection(final Direction theDirection) {
        myDirection = theDirection;
    }

    @Override
    public void setX(final int theX) {
        myX = theX;
        
    }

    @Override
    public void setY(final int theY) {
        myY = theY;
    }
    
    @Override
    public int getX() {
        return myX;
    }
    
    @Override
    public int getY() {
        return myY;
    }
    
    @Override
    public boolean isAlive() {
        return myAlive;
    }
    
    @Override
    public void poke() {
        if (!myAlive) { //if dead
            if (myPokes == myDeathTimer) { //if pokes reaches timer
                myAlive = true; //revive
                myPokes = 0; //reset pokes
                setDirection(Direction.random()); //set direction upon revival
            } else {
                myPokes++; //if dead poke
            }
        }
    }
    
    /**
     * To String.
     * @return String for Vehicle.
     */
    public String toString() {
        final StringBuilder result = new StringBuilder();
        result.append(myAlive);
        result.append(" - Pokes: " + myPokes);
        result.append("Pos: (" + myX + "," + myY + ")");
        return result.toString();
    }
}
