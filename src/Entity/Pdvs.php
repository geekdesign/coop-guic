<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\PdvsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PdvsRepository::class)
 * @ApiResource(
 *   normalizationContext={
 *      "groups" = {"pdvs_read"}
 *   },
 *   denormalizationContext={
 *        "disable_type_enforcement"=true
 *   }
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Pdvs
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"pdvs_read", "bons_read"})
     * @Assert\NotBlank(message="Le sap est obligatoire !")
     * @Assert\Length(
     *      min = 2,
     *      max = 6,
     *      minMessage = "Le sap doit contenir 2 chiffres au minimum",
     *      maxMessage = "Le sap doit contenir 6 chiffres au maximum",
     *      allowEmptyString = false
     * )
     */
    private $sap;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"pdvs_read", "bons_read", "entreprises_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Le nom est obligatoire !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Le nom doit faire entre 3 et 255 caractères !",
     *      maxMessage = "Le nom doit faire entre 3 et 255 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $rue;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     * @Assert\Length(
     *      min = 4,
     *      max = 6,
     *      minMessage = "Le code postal doit contenir 4 chiffres au minimum",
     *      maxMessage = "Le code postal doit contenir 6 chiffres au maximum",
     *      allowEmptyString = false
     * )
     */
    private $npa;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $lieu;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $fax;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     * @Assert\Email(
     *     message = "La valeur saisie n'est pas un email valide !"
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"pdvs_read"})
     * @Assert\Length(
     *      min = 3,
     *      max = 100,
     *      minMessage = "Le format doit faire entre 3 et 100 caractères !",
     *      maxMessage = "Le format doit faire entre 3 et 100 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $format;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"pdvs_read"})
     */
    private $supprimer;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="pdv")
     * @Groups({"pdvs_read"})
     * @ApiSubresource
     */
    private $bons;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"pdvs_read", "bons_read"})
     */
    private $gerant;

    public function __construct()
    {
        $this->bons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSap(): ?int
    {
        return $this->sap;
    }

    public function setSap($sap): self
    {
        $this->sap = $sap;
        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(?string $rue): self
    {
        $this->rue = $rue;

        return $this;
    }

    public function getNpa(): ?int
    {
        return $this->npa;
    }

    public function setNpa($npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(?string $lieu): self
    {
        $this->lieu = $lieu;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(?string $format): self
    {
        $this->format = $format;

        return $this;
    }

    public function getSupprimer(): ?bool
    {
        return $this->supprimer;
    }

    public function setSupprimer(?bool $supprimer): self
    {
        $this->supprimer = $supprimer;

        return $this;
    }

    /**
     * @return Collection|Bons[]
     */
    public function getBons(): Collection
    {
        return $this->bons;
    }

    public function addBon(Bons $bon): self
    {
        if (!$this->bons->contains($bon)) {
            $this->bons[] = $bon;
            $bon->setPdv($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getPdv() === $this) {
                $bon->setPdv(null);
            }
        }

        return $this;
    }

    public function getGerant(): ?string
    {
        return $this->gerant;
    }

    public function setGerant(?string $gerant): self
    {
        $this->gerant = $gerant;

        return $this;
    }
}
