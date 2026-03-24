package com.saloria.model;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class UserTest {

  @Test
  void isEnabledReflectsActiveAndArchivedFlags() {
    User activeUser = User.builder().active(true).archived(false).build();
    User inactiveUser = User.builder().active(false).archived(false).build();
    User archivedUser = User.builder().active(true).archived(true).build();

    assertTrue(activeUser.isEnabled());
    assertFalse(inactiveUser.isEnabled());
    assertFalse(archivedUser.isEnabled());
  }
}
