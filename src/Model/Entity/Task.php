<?php

namespace Scri\EvalTimeTracking\Model\Entity;

use DateTime;

class Task {

    private ?int $id;
    private int $fk_project;
    private string $name;
    private int $time;
    private ?DateTime $lastUpdate;

    /**
     * Task constructor.
     * @param int $fk_project
     * @param string $name
     * @param int $time
     * @param DateTime|null $lastUpdate
     * @param int|null $id
     */
    public function __construct(int $fk_project, string $name, int $time, DateTime $lastUpdate = null, ?int $id = null) {
        $this->id = $id;
        $this->fk_project = $fk_project;
        $this->name = $name;
        $this->time = $time;
        $this->lastUpdate = $lastUpdate;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getFkProject(): int {
        return $this->fk_project;
    }

    /**
     * @param int $fk_project
     */
    public function setFkProject(int $fk_project): Task {
        $this->fk_project = $fk_project;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Task
     */
    public function setName(string $name): Task {
        $this->name = $name;
        return $this;
    }

    /**
     * @return int
     */
    public function getTime(): int {
        return $this->time;
    }

    /**
     * @param int $time
     * @return Task
     */
    public function setTime(int $time): Task {
        $this->time = $time;
        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getLastUpdate(): ?DateTime {
        return $this->lastUpdate;
    }

    /**
     * @param DateTime $lastUpdate
     * @return Task
     */
    public function setLastUpdate(DateTime $lastUpdate): Task {
        $this->lastUpdate = $lastUpdate;
        return $this;
    }

}