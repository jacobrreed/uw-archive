/*
 * TCSS 305 - Easy Street
 */

package model;

import java.util.ArrayList;
import java.util.Map;

/**
 * 
 * Humans move in a random direction (straight, left, or right), always on grass or crosswalks.
 * A human never reverses direction unless there is no other option.
 * If a human is next to a crosswalk it will always 
 * choose to turn to face in the direction of the crosswalk.
 * (The map of terrain will never contain crosswalks that
 * are so close together that a human might be
 * adjacent to more than one at the same time.)
 * Humans do not travel through crosswalks when the crosswalk
 * light is green. If a human is facing a green
 * crosswalk, it will wait until the light changes to yellow 
 * and then cross through the crosswalk. The
 * human will not turn to avoid the crosswalk.
 * Humans travel through crosswalks when the crosswalk light is yellow or red.
 * Humans ignore the color of traffic lights.
 * Collision behavior: A human dies if it collides with any living 
 * vehicle except another human, and stays
 * dead for 50 moves.
 * @author Jacob Reed
 * @version Apr 14, 2017
 *
 */
public class Human extends AbstractVehicle {
    /** Death timer. */
    private static final int DEATH_TIME = 50;
    
    /**
     * Constructor.
     * @param theX X coordinate.
     * @param theY Y coordinate.
     * @param theDir Direction.
     */
    public Human(final int theX, final int theY, 
                 final Direction theDir) {
        super(theX, theY, theDir);
        myDeathTimer = DEATH_TIME;
        myTerrain = new ArrayList<Terrain>();
        myTerrain.add(Terrain.CROSSWALK);
        myTerrain.add(Terrain.GRASS);
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
            result = true;
            if (theTerrain == Terrain.CROSSWALK
                            && theLight == Light.GREEN) {
                result = false;
            }
        }
        return result;
    }

    @Override
    public Direction chooseDirection(final Map<Direction, Terrain> theNeighbors) {
        Direction result = Direction.random();
        result = moveToCross(theNeighbors);
        if (canPass(Terrain.GRASS, Light.YELLOW)) {
            
            if (reverseCheck(theNeighbors)) {
                result = getDirection().reverse();

            } else {
                while (theNeighbors.get(result) != Terrain.GRASS
                       && theNeighbors.get(result) != Terrain.CROSSWALK
                       || result == getDirection().reverse()) {
                    result = Direction.random();
                }
            }
        }

        return result;
    } 
    
    /**
     * Helps chooseDirection by making crosswalks a priority.
     * 
     * @param theNeighbors Map containing Direction, Terrain.
     * @return Direction.
     */
    private Direction moveToCross(final Map<Direction, Terrain> theNeighbors) {
        final Direction result = getDirection();
        Direction rand = Direction.random();

        if (theNeighbors.get(result.right()) == Terrain.CROSSWALK) {
            rand = result.right();
        } else if (theNeighbors.get(result.left()) == Terrain.CROSSWALK) {
            rand = result.left();
        } else if (theNeighbors.get(result) == Terrain.CROSSWALK) {
            rand = getDirection();
        } 
        return rand;
    }

    /**
     * Helps choose direction and makes reverse last priority.
     * 
     * @param theNeighbors Map containing Direction, Terrain.
     * @return True if reverse false otherwise.
     */
    private boolean reverseCheck(final Map<Direction, Terrain> theNeighbors) {
        final Direction result = getDirection();
      
        return theNeighbors.get(getDirection()) != Terrain.GRASS
               && theNeighbors.get(result.right()) != Terrain.GRASS
               && theNeighbors.get(result.left()) != Terrain.GRASS
               && theNeighbors.get(result) != Terrain.CROSSWALK
               && theNeighbors.get(result.right()) != Terrain.CROSSWALK
               && theNeighbors.get(result.left()) != Terrain.CROSSWALK;
    }
}
