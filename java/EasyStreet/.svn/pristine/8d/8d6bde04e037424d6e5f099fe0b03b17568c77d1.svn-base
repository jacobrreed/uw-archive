/*
 * TCSS 305 - Easy Street
 */

package model;

import java.util.ArrayList;
import java.util.Map;

/**
 * 
 * Cars can only travel on streets and through lights and crosswalks.
 * A car prefers to drive straight ahead on the street if it can. 
 * If it cannot move straight ahead, it turns left
 * if possible; if it cannot turn left, it turns right if possible; 
 * as a last resort, it turns around.
 * Cars stop for red lights; if a traffic light is immediately ahead 
 * of the car and the light is red, the car stays
 * still and does not move. It does not turn to avoid the light. When
 *  the light turns green, the car resumes its
 * original direction.
 * Cars ignore yellow and green lights.
 * Cars stop for red and yellow crosswalk lights, but drive through 
 * green crosswalk lights without stopping.
 * Collision behavior: A car dies if it collides with a living truck, 
 * and stays dead for 10 moves.
 * @author Jacob Reed
 * @version Apr 14, 2017
 *
 */
public class Car extends AbstractVehicle {
    /** Death time. */
    private static final int DEATH_TIME = 10;
    
    /**
     * Constructor.
     * @param theX X coordinate.
     * @param theY Y coordinate.
     * @param theDir Direction.
     */
    public Car(final int theX, final int theY, 
                 final Direction theDir) {
        super(theX, theY, theDir);
        myDeathTimer = DEATH_TIME;
        myTerrain = new ArrayList<Terrain>();
        myTerrain.add(Terrain.CROSSWALK);
        myTerrain.add(Terrain.STREET);
        myTerrain.add(Terrain.LIGHT);
    }
    
    /**
     * Returns whether or not truck can pass through terrain dependant on light.
     * @param theTerrain Terrain to analyze.
     * @param theLight Whether light is green or red.
     * @return Can vehicle pass. True if so.
     */
    public boolean canPass(final Terrain theTerrain, final Light theLight) {
        boolean result = false;
        if (myTerrain.contains(theTerrain)) {
            if (theTerrain == Terrain.CROSSWALK
                            && theLight == Light.GREEN) {
                result = true;
            } else if (theTerrain == Terrain.LIGHT
                            && (theLight == Light.GREEN 
                            || theLight == Light.YELLOW)) {
                result = true;
            } else if (theTerrain == Terrain.STREET) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public Direction chooseDirection(final Map<Direction, Terrain> theNeighbors) {
        if ((theNeighbors.get(getDirection()) == Terrain.STREET) 
                        || (theNeighbors.get(getDirection()) == Terrain.LIGHT)) {
            myDirection = getDirection();
        } else if ((theNeighbors.get(getDirection().left()) == Terrain.STREET) 
                        || (theNeighbors.get(getDirection().left()) == Terrain.LIGHT)) {
            myDirection = getDirection().left();
        } else if ((theNeighbors.get(getDirection().right()) == Terrain.STREET) 
                        || (theNeighbors.get(getDirection().right()) == Terrain.LIGHT)) {
            myDirection = getDirection().right();
        } else {
            myDirection = getDirection().reverse();
        }
      
        return myDirection;
    }
    
}
